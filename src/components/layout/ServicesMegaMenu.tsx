"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { handleMegaMenuKeyDown } from "@/components/layout/SecondaryNav";
import { cn } from "@/lib/utils";

export type ServicesMegaGroup = {
  id: string;
  label: string;
  note: string;
  items: {
    key: string;
    title: string;
    description: string;
    href: string;
  }[];
};

export function ServicesMegaMenu({
  open,
  menuId,
  ariaLabel,
  groups,
  viewAllHref,
  viewAllLabel,
  openMenu,
  scheduleClose,
  closeMenu,
  focusTrigger,
  onExitForward,
  setPanelRef,
}: {
  open: boolean;
  menuId: string;
  ariaLabel: string;
  groups: ServicesMegaGroup[];
  viewAllHref: string;
  viewAllLabel: string;
  openMenu: () => void;
  scheduleClose: () => void;
  closeMenu: () => void;
  focusTrigger: () => void;
  onExitForward: () => void;
  setPanelRef: (node: HTMLElement | null) => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          ref={setPanelRef}
          id={menuId}
          role="region"
          aria-label={ariaLabel}
          initial={reduceMotion ? false : { opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="hidden overflow-hidden border-t border-black/[0.06] lg:block"
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
          onKeyDown={(event) =>
            handleMegaMenuKeyDown(event, {
              closeMenu,
              focusTrigger,
              onExitForward,
            })
          }
        >
          {/* Hover bridge so the cursor can travel from trigger → panel */}
          <div className="px-5 pb-5 pt-1 md:px-7 md:pb-6 xl:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
              {groups.map((group) => (
                <div key={group.id} className="min-w-0">
                  <GroupLabel label={group.label} note={group.note} />
                  <ul className="mt-4 space-y-0.5">
                    {group.items.map((item) => (
                      <li key={item.key}>
                        <ServiceLink
                          item={item}
                          open={open}
                          onNavigate={closeMenu}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-black/[0.06] pt-4">
              <Link
                href={viewAllHref}
                tabIndex={open ? undefined : -1}
                className="inline-flex max-w-full items-center gap-2 text-[0.9375rem] font-medium tracking-[-0.01em] text-ink transition-colors hover:text-accent"
                onClick={closeMenu}
              >
                <span>{viewAllLabel}</span>
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function GroupLabel({ label, note }: { label: string; note: string }) {
  return (
    <div className="min-w-0">
      <p className="eyebrow text-accent">{label}</p>
      <p className="mt-1.5 max-w-sm text-[0.8125rem] leading-snug text-charcoal">
        {note}
      </p>
    </div>
  );
}

function ServiceLink({
  item,
  open,
  onNavigate,
}: {
  item: ServicesMegaGroup["items"][number];
  open: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={item.href}
      tabIndex={open ? undefined : -1}
      className={cn(
        "group block min-w-0 rounded-control px-3 py-3 transition-colors duration-200",
        "hover:bg-ink/[0.04] focus-visible:bg-ink/[0.04]",
      )}
      onClick={onNavigate}
    >
      <span className="block text-[1.02rem] font-medium leading-snug tracking-[-0.02em] text-ink transition-colors group-hover:text-accent">
        {item.title}
      </span>
      <span className="mt-1.5 block text-sm leading-relaxed text-charcoal">
        {item.description}
      </span>
    </Link>
  );
}
