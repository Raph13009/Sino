import type { ReactNode } from "react";
import type { BlockNode, InlineNode } from "@/lib/cms/docs-ast";

function Inline({ nodes }: { nodes: InlineNode[] }) {
  return (
    <>
      {nodes.map((node, index) => {
        const key = `${node.type}-${index}`;
        if (node.type === "text") return <span key={key}>{node.text}</span>;
        if (node.type === "strong") {
          return (
            <strong key={key}>
              <Inline nodes={node.children} />
            </strong>
          );
        }
        if (node.type === "em") {
          return (
            <em key={key}>
              <Inline nodes={node.children} />
            </em>
          );
        }
        return (
          <a key={key} href={node.href} className="underline decoration-accent/60 underline-offset-4 hover:text-accent">
            <Inline nodes={node.children} />
          </a>
        );
      })}
    </>
  );
}

function Block({ block }: { block: BlockNode }) {
  if (block.type === "p") {
    return (
      <p>
        <Inline nodes={block.children} />
      </p>
    );
  }
  if (block.type === "h2") {
    return (
      <h2>
        <Inline nodes={block.children} />
      </h2>
    );
  }
  if (block.type === "h3") {
    return (
      <h3>
        <Inline nodes={block.children} />
      </h3>
    );
  }
  if (block.type === "ul" || block.type === "ol") {
    const List = block.type === "ol" ? "ol" : "ul";
    return (
      <List>
        {block.items.map((item, index) => (
          <li key={index}>
            <Inline nodes={item.children} />
          </li>
        ))}
      </List>
    );
  }
  return null;
}

export function ArticleBody({
  blocks,
  className,
}: {
  blocks: BlockNode[];
  className?: string;
}) {
  return (
    <div className={className}>
      {blocks.map((block, index) => (
        <Block key={`${block.type}-${index}`} block={block} />
      ))}
    </div>
  );
}

export function ArticleCta({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action: ReactNode;
}) {
  return (
    <aside className="mt-16 border-t border-border pt-10">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-[1.5rem] leading-tight md:text-[1.75rem]">{title}</h2>
      <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-charcoal">
        {description}
      </p>
      <div className="mt-6">{action}</div>
    </aside>
  );
}

export function CoverFallback({ alt }: { alt: string }) {
  return (
    <figure>
      <div className="flex aspect-[16/9] items-end overflow-hidden bg-ink">
        <p className="p-6 text-sm tracking-[0.08em] text-white-warm uppercase">
          {alt}
        </p>
      </div>
    </figure>
  );
}
