import Link from "next/link";
import { cn } from "@/lib/utils";

export function Breadcrumbs({
  items,
  label = "Breadcrumb",
  className,
}: {
  items: { label: string; href?: string }[];
  label?: string;
  className?: string;
}) {
  return (
    <nav aria-label={label} className={cn("eyebrow", className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-charcoal">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden>/</span> : null}
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-accent">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
