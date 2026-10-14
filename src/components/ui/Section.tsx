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
  light = false,
}: {
  number?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  light?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {(number || eyebrow) && (
        <Eyebrow className={cn("mb-5", light && "text-white-warm/55")} accent={!light}>
          {number ? `${number} / ` : ""}
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={cn(
          "display-section",
          light ? "text-white-warm" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-6 max-w-2xl text-[1.0625rem] leading-relaxed md:text-lg",
            light ? "text-white-warm/70" : "text-charcoal",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
