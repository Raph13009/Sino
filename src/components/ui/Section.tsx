import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav" | "main";
}) {
  return <Tag className={cn("container-editorial", className)}>{children}</Tag>;
}

export function Section({
  children,
  className,
  id,
  tone = "ivory",
  as: Tag = "section",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "ivory" | "white" | "concrete" | "ink" | "sand";
  as?: "section" | "div" | "aside";
}) {
  const tones = {
    ivory: "bg-ivory text-ink",
    white: "bg-white-warm text-ink",
    concrete: "bg-concrete text-ink",
    ink: "bg-ink text-white-warm",
    sand: "bg-sand text-ink",
  };

  return (
    <Tag id={id} className={cn(tones[tone], className)}>
      {children}
    </Tag>
  );
}

export function Eyebrow({
  children,
  className,
  accent = false,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <p className={cn("eyebrow", accent && "eyebrow-accent", className)}>
      {children}
    </p>
  );
}

export function Rule({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark" | "accent";
}) {
  return (
    <hr
      className={cn(
        tone === "accent" ? "rule-accent" : "rule",
        tone === "dark" && "rule-dark",
        className,
      )}
    />
  );
}

export function SectionHeading({
  number,
  eyebrow,
  title,
  description,
  className,
}: {
  number?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {(number || eyebrow) && (
        <Eyebrow className="mb-4">
          {number ? `${number} / ` : ""}
          {eyebrow}
        </Eyebrow>
      )}
      <h2 className="text-[2rem] leading-[1.1] md:text-[2.75rem] lg:text-[3.25rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-charcoal md:text-xl">
          {description}
        </p>
      ) : null}
    </div>
  );
}
