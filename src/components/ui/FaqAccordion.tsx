"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({
  items,
  className,
}: {
  items: readonly FaqItem[];
  className?: string;
}) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <div className={cn("border-t border-border", className)}>
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.question} className="border-b border-border">
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className={cn(
                  "flex w-full items-start justify-between gap-6 py-5 text-left transition-colors md:py-6",
                  "hover:text-accent focus-visible:outline-offset-4",
                )}
              >
                <span className="max-w-[42rem] text-[1.0625rem] font-medium leading-snug text-ink md:text-lg">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center text-xl leading-none text-accent transition-transform duration-300",
                    open && "rotate-45",
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p
                  className={cn(
                    "max-w-2xl pb-5 text-[1.02rem] leading-relaxed text-charcoal md:pb-6",
                    !open && "invisible",
                  )}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
