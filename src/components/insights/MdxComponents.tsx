import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { media } from "@/content/media";
import type { InsightImageKey } from "@/content/insights/schema";
import { cn } from "@/lib/utils";

function Heading2(props: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      {...props}
      className={cn(
        "mt-12 text-[1.75rem] leading-tight tracking-[-0.02em] text-ink first:mt-0 md:text-[2rem]",
        props.className,
      )}
    />
  );
}

function Heading3(props: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      {...props}
      className={cn(
        "mt-8 text-[1.25rem] leading-snug tracking-[-0.02em] text-ink md:text-[1.375rem]",
        props.className,
      )}
    />
  );
}

function Paragraph(props: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      {...props}
      className={cn(
        "mt-5 text-[1.0625rem] leading-relaxed text-charcoal first:mt-0",
        props.className,
      )}
    />
  );
}

function UnorderedList(props: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul
      {...props}
      className={cn(
        "mt-5 list-disc space-y-2 pl-5 text-[1.0625rem] leading-relaxed text-charcoal",
        props.className,
      )}
    />
  );
}

function OrderedList(props: ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      {...props}
      className={cn(
        "mt-5 list-decimal space-y-2 pl-5 text-[1.0625rem] leading-relaxed text-charcoal",
        props.className,
      )}
    />
  );
}

function ListItem(props: ComponentPropsWithoutRef<"li">) {
  return <li {...props} className={cn("pl-1", props.className)} />;
}

function Blockquote(props: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      {...props}
      className={cn(
        "mt-8 border-l-2 border-accent pl-5 text-[1.125rem] leading-relaxed text-ink",
        props.className,
      )}
    />
  );
}

function Anchor(props: ComponentPropsWithoutRef<"a">) {
  const href = props.href ?? "#";
  const external = href.startsWith("http");
  if (external) {
    return (
      <a
        {...props}
        className={cn(
          "font-medium text-ink underline decoration-border underline-offset-4 transition-colors hover:text-accent",
          props.className,
        )}
        rel="noopener noreferrer"
        target="_blank"
      />
    );
  }
  return (
    <Link
      href={href}
      className={cn(
        "font-medium text-ink underline decoration-border underline-offset-4 transition-colors hover:text-accent",
        props.className,
      )}
    >
      {props.children}
    </Link>
  );
}

function Table(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="mt-8 overflow-x-auto border border-border">
      <table
        {...props}
        className={cn(
          "w-full min-w-[32rem] border-collapse text-left text-[0.9375rem]",
          props.className,
        )}
      />
    </div>
  );
}

function Th(props: ComponentPropsWithoutRef<"th">) {
  return (
    <th
      {...props}
      className={cn(
        "border-b border-border bg-white-warm px-4 py-3 font-medium text-ink",
        props.className,
      )}
    />
  );
}

function Td(props: ComponentPropsWithoutRef<"td">) {
  return (
    <td
      {...props}
      className={cn(
        "border-b border-border px-4 py-3 text-charcoal",
        props.className,
      )}
    />
  );
}

export function InsightCta({
  eyebrow,
  title,
  body,
  href,
  label,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  href: string;
  label: string;
}) {
  return (
    <aside className="mt-12 border border-border bg-white-warm px-6 py-6 md:px-8 md:py-7">
      {eyebrow ? <p className="eyebrow text-accent">{eyebrow}</p> : null}
      <p
        className={cn(
          "text-xl font-medium tracking-[-0.02em] text-ink",
          eyebrow ? "mt-3" : "",
        )}
      >
        {title}
      </p>
      {body ? (
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-charcoal">
          {body}
        </p>
      ) : null}
      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink transition-colors hover:text-accent"
      >
        <span>{label}</span>
        <span aria-hidden>→</span>
      </Link>
    </aside>
  );
}

export function InsightFaq({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12 border-t border-border pt-8">
      {title ? (
        <h2 className="text-[1.75rem] leading-tight tracking-[-0.02em] text-ink md:text-[2rem]">
          {title}
        </h2>
      ) : null}
      <div className={cn(title && "mt-6", "space-y-0")}>{children}</div>
    </section>
  );
}

export function InsightFaqItem({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  return (
    <details className="border-b border-border py-4">
      <summary className="cursor-pointer list-none text-[1.0625rem] font-medium text-ink marker:content-none [&::-webkit-details-marker]:hidden">
        <span className="flex items-start justify-between gap-4">
          <span>{question}</span>
          <span aria-hidden className="text-charcoal">
            +
          </span>
        </span>
      </summary>
      <div className="mt-3 text-[1.0625rem] leading-relaxed text-charcoal">
        {children}
      </div>
    </details>
  );
}

export function InsightMedia({
  id,
  caption,
}: {
  id: InsightImageKey;
  caption?: string;
}) {
  const asset = media.insights[id];
  return (
    <figure className="mt-10">
      <div className="overflow-hidden">
        <Image
          src={asset.src}
          alt={asset.alt}
          width={asset.width}
          height={asset.height}
          sizes="(max-width: 768px) 100vw, 720px"
          className="h-auto w-full object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="eyebrow mt-3 text-charcoal">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export const insightMdxComponents = {
  h2: Heading2,
  h3: Heading3,
  p: Paragraph,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  blockquote: Blockquote,
  a: Anchor,
  table: Table,
  th: Th,
  td: Td,
  InsightCta,
  InsightFaq,
  InsightFaqItem,
  InsightMedia,
} satisfies MDXComponents;
