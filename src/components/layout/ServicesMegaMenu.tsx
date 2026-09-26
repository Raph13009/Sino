"use client";

import Link from "next/link";
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
  const [lead, ...rest] = groups;

  return (
    <div
      ref={setPanelRef}
      id={menuId}
      role="region"
      aria-label={ariaLabel}
      aria-hidden={!open}
      inert={!open ? true : undefined}
      className={cn(
        "absolute inset-x-0 top-full z-40 hidden border-b border-border bg-white-warm shadow-[0_18px_40px_-28px_rgba(12,35,60,0.45)] lg:block",
        "transition-opacity duration-200 ease-out",
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      )}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onKeyDown={(event) =>
        handleMegaMenuKeyDown(event, { closeMenu, focusTrigger, onExitForward })
      }
    >
      <div className="container-editorial py-6 xl:py-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-0">
          {lead ? (
            <div className="min-w-0 lg:col-span-4 lg:pr-8">
              <GroupLabel label={lead.label} note={lead.note} />
              <ul className="mt-4">
                {lead.items.map((item) => (
                  <li key={item.key}>
                    <ServiceLink
                      item={item}
                      featured
                      open={open}
                      onNavigate={closeMenu}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {rest.map((group, index) => (
            <div
              key={group.id}
              className={cn(
                "min-w-0 lg:col-span-4 lg:border-l lg:border-border lg:px-8",
                index === rest.length - 1 && "lg:pr-0",
              )}
            >
              <GroupLabel label={group.label} note={group.note} />
              <ul className="mt-4 divide-y divide-border">
                {group.items.map((item) => (
                  <li key={item.key}>
                    <ServiceLink item={item} open={open} onNavigate={closeMenu} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-border pt-4">
          <Link
            href={viewAllHref}
            className="inline-flex max-w-full items-center gap-3 text-base font-medium tracking-[-0.01em] text-ink transition-colors hover:text-accent"
            onClick={closeMenu}
          >
            <span>{viewAllLabel}</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function GroupLabel({ label, note }: { label: string; note: string }) {
  return (
    <div className="min-w-0">
      <p className="eyebrow text-accent">{label}</p>
      <p className="mt-1 text-sm leading-snug text-charcoal">{note}</p>
    </div>
  );
}

function ServiceLink({
  item,
  featured = false,
  open,
  onNavigate,
}: {
  item: ServicesMegaGroup["items"][number];
  featured?: boolean;
  open: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={item.href}
      tabIndex={open ? undefined : -1}
      className={cn(
        "group block min-w-0 py-3",
        featured && "py-1",
      )}
      onClick={onNavigate}
    >
      <span
        className={cn(
          "block font-medium tracking-[-0.02em] text-ink transition-colors group-hover:text-accent",
          featured
            ? "text-[1.35rem] leading-tight xl:text-[1.5rem]"
            : "text-[1.02rem] leading-snug",
        )}
      >
        {item.title}
      </span>
      <span
        className={cn(
          "mt-1.5 block leading-relaxed text-charcoal",
          featured ? "max-w-[34ch] text-[0.9375rem]" : "text-sm",
        )}
      >
        {item.description}
      </span>
    </Link>
  );
}
