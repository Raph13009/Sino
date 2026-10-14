"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
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
  openFromKeyboard: () => void;
  closeMenu: () => void;
  scheduleClose: () => void;
  focusTrigger: () => void;
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
  const focusOnOpen = useRef(false);
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
    focusOnOpen.current = false;
    onOpenChange(false);
  }, [onOpenChange]);

  const focusTrigger = useCallback(() => {
    triggerRef.current?.focus();
  }, []);

  const openFromKeyboard = useCallback(() => {
    if (open) {
      focusOnOpen.current = false;
      panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
      return;
    }
    focusOnOpen.current = true;
    openMenu();
  }, [open, openMenu]);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => onOpenChange(false), 320);
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
      if (event.key !== "Escape") return;
      const inPanel = panelRef.current?.contains(document.activeElement);
      event.preventDefault();
      closeMenu();
      if (inPanel) triggerRef.current?.focus();
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

  useEffect(() => {
    if (!open || !focusOnOpen.current) return;
    focusOnOpen.current = false;
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
  }, [open]);

  return {
    open,
    menuId,
    openMenu,
    openFromKeyboard,
    closeMenu,
    scheduleClose,
    focusTrigger,
    setTriggerRef,
    setPanelRef,
  };
}

export function handleMegaMenuKeyDown(
  event: ReactKeyboardEvent<HTMLElement>,
  actions: {
    closeMenu: () => void;
    focusTrigger: () => void;
    onExitForward: () => void;
  },
) {
  const links = Array.from(
    event.currentTarget.querySelectorAll<HTMLAnchorElement>("a[href]"),
  );
  const index = links.findIndex((link) => link === document.activeElement);

  if (event.key === "ArrowDown" || event.key === "ArrowRight") {
    event.preventDefault();
    links[(index + 1) % links.length]?.focus();
    return;
  }

  if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
    event.preventDefault();
    links[(index - 1 + links.length) % links.length]?.focus();
    return;
  }

  if (event.key === "Home") {
    event.preventDefault();
    links[0]?.focus();
    return;
  }

  if (event.key === "End") {
    event.preventDefault();
    links[links.length - 1]?.focus();
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();
    actions.closeMenu();
    actions.focusTrigger();
    return;
  }

  if (event.key === "Tab") {
    event.preventDefault();
    actions.closeMenu();
    if (event.shiftKey) actions.focusTrigger();
    else actions.onExitForward();
  }
}

export function SecondaryNavTrigger({
  href,
  label,
  open,
  menuId,
  openMenu,
  openFromKeyboard,
  scheduleClose,
  setTriggerRef,
  onNavigate,
  inverted = false,
}: Pick<
  SecondaryNavController,
  | "open"
  | "menuId"
  | "openMenu"
  | "openFromKeyboard"
  | "scheduleClose"
  | "setTriggerRef"
> & {
  href: string;
  label: string;
  onNavigate?: () => void;
  inverted?: boolean;
}) {
  return (
    <Link
      ref={setTriggerRef}
      href={href}
      className={cn(
        "text-[0.9375rem] font-medium tracking-[-0.01em] transition-colors duration-200",
        open
          ? "text-accent"
          : inverted
            ? "text-white-warm/90 hover:text-white-warm"
            : "text-ink hover:text-accent",
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
          openFromKeyboard();
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
  focusTrigger,
  setPanelRef,
  onExitForward,
  onNavigate,
}: Pick<
  SecondaryNavController,
  | "open"
  | "menuId"
  | "openMenu"
  | "scheduleClose"
  | "closeMenu"
  | "focusTrigger"
  | "setPanelRef"
> & {
  onExitForward: () => void;
  ariaLabel: string;
  items: SecondaryNavItem[];
  viewAllHref: string;
  viewAllLabel: string;
  learnMoreLabel: string;
  onNavigate?: () => void;
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
          <div className="px-5 pb-5 pt-1 md:px-7 md:pb-6 xl:px-8">
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
              {items.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    tabIndex={open ? undefined : -1}
                    className="group flex h-full flex-col rounded-control px-3 py-3 transition-colors duration-200 hover:bg-ink/[0.04] focus-visible:bg-ink/[0.04]"
                    onClick={() => {
                      closeMenu();
                      onNavigate?.();
                    }}
                  >
                    <p className="eyebrow text-accent/80">{item.number}</p>
                    <p className="mt-2 text-base font-medium leading-snug tracking-[-0.02em] text-ink transition-colors duration-200 group-hover:text-accent xl:text-[1.0625rem]">
                      {item.title}
                    </p>
                    <p className="mt-1.5 line-clamp-3 text-[0.8125rem] leading-relaxed text-charcoal">
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

            <div className="mt-4 flex justify-end border-t border-black/[0.06] pt-3.5">
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
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
