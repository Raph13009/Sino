"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";

export type SecondaryNavItem = {
  key: string;
  number: string;
  title: string;
  description: string;
  href: string;
};

type SecondaryNavController = {
  open: boolean;
  menuId: string;
  openMenu: () => void;
  closeMenu: () => void;
  scheduleClose: () => void;
  setTriggerRef: (node: HTMLElement | null) => void;
  setPanelRef: (node: HTMLElement | null) => void;
};

export function useSecondaryNav(
  open: boolean,
  onOpenChange: (open: boolean) => void,
  options?: {
    onOpen?: () => void;
  },
): SecondaryNavController {
  const menuId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const onOpen = options?.onOpen;

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMenu = useCallback(() => {
    clearCloseTimer();
    onOpen?.();
    onOpenChange(true);
  }, [onOpen, onOpenChange]);

  const closeMenu = useCallback(() => {
    clearCloseTimer();
    onOpenChange(false);
  }, [onOpenChange]);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => onOpenChange(false), 220);
  }, [onOpenChange]);

  const setTriggerRef = useCallback((node: HTMLElement | null) => {
    triggerRef.current = node;
  }, []);

  const setPanelRef = useCallback((node: HTMLElement | null) => {
    panelRef.current = node;
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const inTrigger = triggerRef.current?.contains(target);
      const inPanel = panelRef.current?.contains(target);
      if (!inTrigger && !inPanel) closeMenu();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open, closeMenu]);

  useEffect(() => () => clearCloseTimer(), []);

  return {
    open,
    menuId,
    openMenu,
    closeMenu,
    scheduleClose,
    setTriggerRef,
    setPanelRef,
  };
}

export function SecondaryNavTrigger({
  href,
  label,
  open,
  menuId,
  openMenu,
  scheduleClose,
  setTriggerRef,
  onNavigate,
}: Pick<
  SecondaryNavController,
  "open" | "menuId" | "openMenu" | "scheduleClose" | "setTriggerRef"
> & {
  href: string;
  label: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      ref={setTriggerRef}
      href={href}
      className={cn(
        "text-[0.9375rem] font-medium tracking-[-0.01em] transition-colors duration-200",
        open ? "text-accent" : "text-ink hover:text-accent",
      )}
      aria-expanded={open}
      aria-controls={menuId}
      aria-haspopup="true"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onFocus={openMenu}
      onClick={onNavigate}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          openMenu();
        }
      }}
    >
      {label}
    </Link>
  );
}

export function SecondaryNavPanel({
  open,
  menuId,
  ariaLabel,
  items,
  viewAllHref,
  viewAllLabel,
  learnMoreLabel,
  openMenu,
  scheduleClose,
  closeMenu,
  setPanelRef,
  onNavigate,
}: Pick<
  SecondaryNavController,
  | "open"
  | "menuId"
  | "openMenu"
  | "scheduleClose"
  | "closeMenu"
  | "setPanelRef"
> & {
  ariaLabel: string;
  items: SecondaryNavItem[];
  viewAllHref: string;
  viewAllLabel: string;
  learnMoreLabel: string;
  onNavigate?: () => void;
}) {
  return (
    <div
      ref={setPanelRef}
      id={menuId}
      role="region"
      aria-label={ariaLabel}
      aria-hidden={!open}
      inert={!open ? true : undefined}
      className={cn(
        "absolute inset-x-0 top-full z-40 hidden border-b border-border bg-white-warm lg:block",
        "transition-opacity duration-200 ease-out",
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      )}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <div className="container-editorial py-4 xl:py-5">
        <ul className="grid grid-cols-4">
          {items.map((item, index) => (
            <li
              key={item.key}
              className={cn(index > 0 && "border-l border-border")}
            >
              <Link
                href={item.href}
                tabIndex={open ? undefined : -1}
                className={cn(
                  "group flex h-full flex-col px-4 xl:px-5",
                  index === 0 && "pl-0",
                  index === items.length - 1 && "pr-0",
                )}
                onClick={() => {
                  closeMenu();
                  onNavigate?.();
                }}
              >
                <p className="eyebrow">{item.number}</p>
                <p className="mt-2 text-base font-medium leading-snug tracking-[-0.02em] text-ink transition-colors duration-200 group-hover:text-accent xl:text-[1.0625rem]">
                  {item.title}
                </p>
                <p className="mt-1.5 line-clamp-2 text-[0.8125rem] leading-relaxed text-charcoal">
                  {item.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink transition-colors duration-200 group-hover:text-accent">
                  <span>{learnMoreLabel}</span>
                  <span
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-3.5 flex justify-end border-t border-border pt-3">
          <Link
            href={viewAllHref}
            tabIndex={open ? undefined : -1}
            className="inline-flex items-center gap-2 text-[0.8125rem] font-medium tracking-[-0.01em] text-ink transition-colors duration-200 hover:text-accent"
            onClick={() => {
              closeMenu();
              onNavigate?.();
            }}
          >
            <span>{viewAllLabel}</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
