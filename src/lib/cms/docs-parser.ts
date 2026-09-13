import type { BlockNode, InlineNode, ParsedDoc } from "./docs-ast";
import { sanitizeHref } from "./ids";

type DocsTextStyle = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  link?: { url?: string };
};

type DocsParagraphElement = {
  textRun?: {
    content?: string;
    textStyle?: DocsTextStyle;
  };
};

type DocsBullet = {
  listId?: string;
  nestingLevel?: number;
};

type DocsParagraph = {
  elements?: DocsParagraphElement[];
  paragraphStyle?: { namedStyleType?: string };
  bullet?: DocsBullet;
};

type DocsStructuralElement = {
  paragraph?: DocsParagraph;
};

type DocsList = {
  listProperties?: {
    nestingLevels?: Array<{
      glyphType?: string;
      glyphFormat?: string;
    }>;
  };
};

export type GoogleDocsDocument = {
  title?: string;
  body?: { content?: DocsStructuralElement[] };
  lists?: Record<string, DocsList>;
};

const NUMBERED_GLYPHS = new Set([
  "DECIMAL",
  "ZERO_DECIMAL",
  "UPPER_ALPHA",
  "LOWER_ALPHA",
  "UPPER_ROMAN",
  "LOWER_ROMAN",
]);

export function parseGoogleDoc(doc: GoogleDocsDocument): ParsedDoc {
  const titleFromDoc = doc.title?.trim() || null;
  const blocks: BlockNode[] = [];
  let pendingList: {
    type: "ul" | "ol";
    listId: string;
    items: { children: InlineNode[] }[];
  } | null = null;

  const flushList = () => {
    if (pendingList && pendingList.items.length > 0) {
      blocks.push({
        type: pendingList.type,
        items: pendingList.items,
      });
    }
    pendingList = null;
  };

  for (const element of doc.body?.content ?? []) {
    const paragraph = element.paragraph;
    if (!paragraph) {
      flushList();
      continue;
    }

    const children = parseInline(paragraph.elements ?? []);
    if (isEmptyInline(children)) continue;

    const named = paragraph.paragraphStyle?.namedStyleType ?? "NORMAL_TEXT";

    if (named === "TITLE") {
      flushList();
      continue;
    }

    if (paragraph.bullet?.listId) {
      const listId = paragraph.bullet.listId;
      const listType = listKind(doc.lists?.[listId], paragraph.bullet.nestingLevel);
      if (!pendingList || pendingList.listId !== listId || pendingList.type !== listType) {
        flushList();
        pendingList = { type: listType, listId, items: [] };
      }
      pendingList.items.push({ children });
      continue;
    }

    flushList();

    if (named === "HEADING_1" || named === "HEADING_2" || named === "SUBTITLE") {
      blocks.push({ type: "h2", children });
      continue;
    }
    if (named === "HEADING_3" || named === "HEADING_4" || named === "HEADING_5" || named === "HEADING_6") {
      blocks.push({ type: "h3", children });
      continue;
    }

    blocks.push({ type: "p", children });
  }

  flushList();

  return {
    title: titleFromDoc,
    blocks,
    plainText: blocksToPlainText(blocks),
  };
}

function listKind(list: DocsList | undefined, nestingLevel = 0): "ul" | "ol" {
  const level = list?.listProperties?.nestingLevels?.[nestingLevel] ??
    list?.listProperties?.nestingLevels?.[0];
  if (!level) return "ul";
  if (level.glyphType && NUMBERED_GLYPHS.has(level.glyphType)) return "ol";
  if (level.glyphFormat && /%\d/.test(level.glyphFormat) && !/[•◦▪]/.test(level.glyphFormat)) {
    return "ol";
  }
  return "ul";
}

function parseInline(elements: DocsParagraphElement[]): InlineNode[] {
  const nodes: InlineNode[] = [];

  for (const element of elements) {
    const run = element.textRun;
    if (!run?.content) continue;
    const text = run.content.replace(/\r/g, "").replace(/\u000b/g, "\n").replace(/\n$/g, "");
    if (!text) continue;

    const parts = text.split("\n");
    parts.forEach((part, index) => {
      if (part) nodes.push(wrapStyled(part, run.textStyle));
      if (index < parts.length - 1) nodes.push({ type: "text", text: " " });
    });
  }

  return nodes;
}

function wrapStyled(text: string, style?: DocsTextStyle): InlineNode {
  let node: InlineNode = { type: "text", text };
  if (style?.italic) node = { type: "em", children: [node] };
  if (style?.bold) node = { type: "strong", children: [node] };
  const href = style?.link?.url ? sanitizeHref(style.link.url) : null;
  if (href) node = { type: "a", href, children: [node] };
  return node;
}

function isEmptyInline(nodes: InlineNode[]): boolean {
  return !nodes.some((node) => inlineText(node).trim().length > 0);
}

function inlineText(node: InlineNode): string {
  if (node.type === "text") return node.text;
  return node.children.map(inlineText).join("");
}

export function blocksToPlainText(blocks: BlockNode[]): string {
  return blocks
    .map((block) => {
      if ("items" in block) {
        return block.items.map((item) => item.children.map(inlineText).join("")).join("\n");
      }
      return block.children.map(inlineText).join("");
    })
    .filter(Boolean)
    .join("\n\n");
}
