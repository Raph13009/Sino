"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { getServices } from "@/content/localized";
import { cn } from "@/lib/utils";

type ServicesMegaMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate?: () => void;
};

export function ServicesMegaMenu({
  open,
  onOpenChange,
  onNavigate,
}: ServicesMegaMenuProps) {
  const { dict, locale, path } = useLocale();
  const services = getServices(locale, dict);
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => onOpenChange(false), 160);
  };

  const openMenu = () => {
    clearCloseTimer();
    onOpenChange(true);
  };

  const closeMenu = useCallback(() => {
    clearCloseTimer();
    onOpenChange(false);
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    const onPointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open, closeMenu]);

  useEffect(() => () => clearCloseTimer(), []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className={cn(
          "text-[0.9375rem] font-medium tracking-[-0.01em] transition-colors",
          open ? "text-accent" : "text-ink hover:text-accent",
        )}
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={() => onOpenChange(!open)}
      >
        {dict.nav.primary.services}
      </button>

      <div
        id={menuId}
        role="region"
        aria-label={dict.nav.aria.servicesMenu}
        className={cn(
          "absolute left-1/2 top-full z-50 w-[min(92vw,52rem)] -translate-x-1/2 pt-4 transition-opacity duration-150",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <div className="border border-border bg-ivory">
          <div className="border-b border-border px-6 py-4 md:px-8">
            <p className="eyebrow text-accent">{dict.nav.megaMenu.title}</p>
          </div>

          <ul className="grid md:grid-cols-2">
            {services.map((service, index) => (
              <li
                key={service.slug}
                className={cn(
                  "border-b border-border md:border-b",
                  index % 2 === 0 && "md:border-r",
                  index >= 2 && "md:border-b-0",
                )}
              >
                <Link
                  href={service.href}
                  className="group block px-6 py-6 transition-colors hover:bg-white-warm md:px-8"
                  onClick={() => {
                    closeMenu();
                    onNavigate?.();
                  }}
                >
                  <p className="eyebrow">{service.number}</p>
                  <p className="mt-3 text-lg font-medium tracking-[-0.02em] text-ink transition-colors group-hover:text-accent">
                    {service.name}
                  </p>
                  <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-charcoal">
                    {service.megaDescription}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-t border-border px-6 py-4 md:px-8">
            <Link
              href={path("/services")}
              className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink transition-colors hover:text-accent"
              onClick={() => {
                closeMenu();
                onNavigate?.();
              }}
            >
              <span>{dict.nav.megaMenu.viewAll}</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
