export type InlineNode =
  | { type: "text"; text: string }
  | { type: "strong"; children: InlineNode[] }
  | { type: "em"; children: InlineNode[] }
  | { type: "a"; href: string; children: InlineNode[] };

export type ListItemNode = {
  children: InlineNode[];
};

export type BlockNode =
  | { type: "p" | "h2" | "h3"; children: InlineNode[] }
  | { type: "ul" | "ol"; items: ListItemNode[] };

export type ParsedDoc = {
  title: string | null;
  blocks: BlockNode[];
  plainText: string;
};
