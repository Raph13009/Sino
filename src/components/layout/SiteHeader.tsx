"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import {
  SecondaryNavPanel,
  SecondaryNavTrigger,
  useSecondaryNav,
} from "@/components/layout/SecondaryNav";
import { Logo } from "@/components/ui/Logo";
import { getIndustries, getServices } from "@/content/localized";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/body-scroll-lock";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { dict, locale, path } = useLocale();
  const services = getServices(locale, dict);
  const industries = getIndustries(locale, dict);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);

  const scrollYRef = useRef(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const drawerTitleId = useId();

  const closeDesktopPanels = useCallback(() => {
    setServicesOpen(false);
    setIndustriesOpen(false);
  }, []);

  const servicesMenu = useSecondaryNav(servicesOpen, setServicesOpen, {
    onOpen: () => setIndustriesOpen(false),
  });
  const industriesMenu = useSecondaryNav(industriesOpen, setIndustriesOpen, {
    onOpen: () => setServicesOpen(false),
  });

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setMobileServicesOpen(false);
    setMobileIndustriesOpen(false);
  }, []);

  const openDrawer = useCallback(() => {
    scrollYRef.current =
      window.scrollY || document.documentElement.scrollTop || 0;
    setDrawerOpen(true);
  }, []);

  const toggleDrawer = useCallback(() => {
    if (drawerOpen) {
      closeDrawer();
      return;
    }
    openDrawer();
  }, [drawerOpen, closeDrawer, openDrawer]);

  const primaryLinks = [
    { label: dict.nav.primary.insights, href: path("/insights") },
    { label: dict.nav.primary.about, href: path("/about") },
    { label: dict.nav.primary.contact, href: path("/contact") },
  ];

  const serviceItems = services.map((service) => ({
    key: service.slug,
    number: service.number,
    title: service.name,
    description: service.megaDescription,
    href: service.href,
  }));

  const industryItems = industries.map((industry) => ({
    key: industry.slug,
    number: industry.number,
    title: industry.name,
    description: industry.summary,
    href: industry.href,
  }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    if (drawerOpen) {
      lockBodyScroll(scrollYRef.current);
      return;
    }
    if (document.body.dataset.scrollLocked === "true") {
      unlockBodyScroll(scrollYRef.current);
    }
  }, [drawerOpen]);

  useEffect(() => {
    if (!drawerOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDrawer();
        menuButtonRef.current?.focus({ preventScroll: true });
      }

      if (event.key !== "Tab" || !headerRef.current) return;

      const focusable = headerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const items = Array.from(focusable).filter(
        (el) => !el.hasAttribute("disabled") && el.offsetParent !== null,
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      const target = event.target as Node | null;
      if (
        drawerRef.current?.contains(target) ||
        menuButtonRef.current?.contains(target)
      ) {
        return;
      }
      event.preventDefault();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("touchmove", onTouchMove);
    };
  }, [drawerOpen, closeDrawer]);

  useEffect(() => {
    return () => {
      if (document.body.dataset.scrollLocked === "true") {
        unlockBodyScroll(scrollYRef.current);
      }
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "z-50 border-b border-border/80 bg-ivory/95 backdrop-blur-sm transition-shadow duration-200",
        "pt-[env(safe-area-inset-top)]",
        drawerOpen
          ? "fixed inset-x-0 top-0 shadow-none"
          : "sticky top-0",
        scrolled && !drawerOpen && "shadow-[0_1px_0_rgba(23,26,31,0.06)]",
      )}
    >
      <div className="container-editorial flex h-16 items-center justify-between gap-3 pr-[max(0px,env(safe-area-inset-right))] md:h-20 md:gap-6">
        <Logo priority href={path("/")} />

        <nav
          aria-label={dict.nav.aria.primary}
          className="hidden items-center gap-7 lg:flex xl:gap-8"
        >
          <SecondaryNavTrigger
            href={path("/services")}
            label={dict.nav.primary.services}
            open={servicesMenu.open}
            menuId={servicesMenu.menuId}
            openMenu={servicesMenu.openMenu}
            scheduleClose={servicesMenu.scheduleClose}
            setTriggerRef={servicesMenu.setTriggerRef}
            onNavigate={closeDesktopPanels}
          />
          <SecondaryNavTrigger
            href={path("/industries")}
            label={dict.nav.primary.industries}
            open={industriesMenu.open}
            menuId={industriesMenu.menuId}
            openMenu={industriesMenu.openMenu}
            scheduleClose={industriesMenu.scheduleClose}
            setTriggerRef={industriesMenu.setTriggerRef}
            onNavigate={closeDesktopPanels}
          />
          {primaryLinks.map((item) => {
            const isContact = item.href.endsWith("/contact");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[0.9375rem] font-medium tracking-[-0.01em] transition-colors",
                  isContact
                    ? "text-accent hover:text-accent-dark"
                    : "text-ink hover:text-accent",
                )}
                onMouseEnter={closeDesktopPanels}
                onFocus={closeDesktopPanels}
              >
                {item.label}
              </Link>
            );
          })}
          <span className="mx-1 h-3 w-px bg-border" aria-hidden />
          <LanguageSwitcher />
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher className="shrink-0" />
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-border"
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav"
            aria-label={drawerOpen ? dict.common.closeMenu : dict.common.openMenu}
            onClick={toggleDrawer}
          >
            <span className="sr-only">{dict.common.menu}</span>
            {drawerOpen ? (
              <span className="relative block h-3.5 w-3.5" aria-hidden>
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-45 bg-ink" />
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-45 bg-ink" />
              </span>
            ) : (
              <span className="flex w-4 flex-col gap-1.5" aria-hidden>
                <span className="h-px w-full bg-ink" />
                <span className="h-px w-full bg-ink" />
                <span className="h-px w-full bg-ink" />
              </span>
            )}
          </button>
        </div>
      </div>

      <SecondaryNavPanel
        open={servicesMenu.open}
        menuId={servicesMenu.menuId}
        ariaLabel={dict.nav.aria.servicesMenu}
        items={serviceItems}
        viewAllHref={path("/services")}
        viewAllLabel={dict.nav.megaMenu.viewAll}
        learnMoreLabel={dict.common.learnMore}
        openMenu={servicesMenu.openMenu}
        scheduleClose={servicesMenu.scheduleClose}
        closeMenu={servicesMenu.closeMenu}
        setPanelRef={servicesMenu.setPanelRef}
      />

      <SecondaryNavPanel
        open={industriesMenu.open}
        menuId={industriesMenu.menuId}
        ariaLabel={dict.nav.aria.industriesMenu}
        items={industryItems}
        viewAllHref={path("/industries")}
        viewAllLabel={dict.nav.megaMenu.viewAllIndustries}
        learnMoreLabel={dict.common.learnMore}
        openMenu={industriesMenu.openMenu}
        scheduleClose={industriesMenu.scheduleClose}
        closeMenu={industriesMenu.closeMenu}
        setPanelRef={industriesMenu.setPanelRef}
      />

      <div
        id="mobile-nav"
        ref={drawerRef}
        role="dialog"
        aria-modal={drawerOpen}
        aria-labelledby={drawerTitleId}
        hidden={!drawerOpen}
        className={cn(
          "border-t border-border bg-ivory lg:hidden",
          "absolute inset-x-0 top-full",
          "min-h-[calc(100dvh-4rem-env(safe-area-inset-top))] md:min-h-[calc(100dvh-5rem-env(safe-area-inset-top))]",
          "max-h-[calc(100dvh-4rem-env(safe-area-inset-top))] md:max-h-[calc(100dvh-5rem-env(safe-area-inset-top))]",
          drawerOpen ? "block" : "hidden",
        )}
      >
        <p id={drawerTitleId} className="sr-only">
          {dict.nav.aria.mobile}
        </p>
        <nav
          aria-label={dict.nav.aria.mobile}
          className="container-editorial h-full max-h-[inherit] overflow-y-auto overscroll-contain py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
        >
          <ul className="flex flex-col">
            <MobileExpandableSection
              href={path("/services")}
              label={dict.nav.primary.services}
              expanded={mobileServicesOpen}
              onToggle={() => setMobileServicesOpen((value) => !value)}
              expandLabel={dict.nav.aria.expandServices}
              collapseLabel={dict.nav.aria.collapseServices}
              onNavigate={closeDrawer}
            >
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={service.href}
                    className="flex items-start gap-3 py-3 pl-1 text-[1rem]"
                    onClick={closeDrawer}
                  >
                    <span className="eyebrow mt-0.5 shrink-0 text-accent">
                      {service.number}
                    </span>
                    <span className="font-medium text-ink">{service.name}</span>
                  </Link>
                </li>
              ))}
            </MobileExpandableSection>

            <MobileExpandableSection
              href={path("/industries")}
              label={dict.nav.primary.industries}
              expanded={mobileIndustriesOpen}
              onToggle={() => setMobileIndustriesOpen((value) => !value)}
              expandLabel={dict.nav.aria.expandIndustries}
              collapseLabel={dict.nav.aria.collapseIndustries}
              onNavigate={closeDrawer}
            >
              {industries.map((industry) => (
                <li key={industry.slug}>
                  <Link
                    href={industry.href}
                    className="flex items-start gap-3 py-3 pl-1 text-[1rem]"
                    onClick={closeDrawer}
                  >
                    <span className="eyebrow mt-0.5 shrink-0 text-accent">
                      {industry.number}
                    </span>
                    <span className="font-medium text-ink">{industry.name}</span>
                  </Link>
                </li>
              ))}
            </MobileExpandableSection>

            {primaryLinks.map((item) => (
              <li key={item.href} className="border-b border-border">
                <Link
                  href={item.href}
                  className="flex items-center justify-between py-4 text-lg font-medium"
                  onClick={closeDrawer}
                >
                  <span
                    className={
                      item.href.endsWith("/contact") ? "text-accent" : "text-ink"
                    }
                  >
                    {item.label}
                  </span>
                  <span aria-hidden className="text-charcoal">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function MobileExpandableSection({
  href,
  label,
  expanded,
  onToggle,
  expandLabel,
  collapseLabel,
  onNavigate,
  children,
}: {
  href: string;
  label: string;
  expanded: boolean;
  onToggle: () => void;
  expandLabel: string;
  collapseLabel: string;
  onNavigate: () => void;
  children: ReactNode;
}) {
  const panelId = useId();

  return (
    <li className="border-b border-border">
      <div className="flex items-stretch">
        <Link
          href={href}
          className="flex min-w-0 flex-1 items-center py-4 text-left text-lg font-medium text-ink"
          onClick={onNavigate}
        >
          {label}
        </Link>
        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center self-center text-charcoal"
          aria-expanded={expanded}
          aria-controls={panelId}
          aria-label={expanded ? collapseLabel : expandLabel}
          onClick={onToggle}
        >
          <span aria-hidden className="text-xl leading-none">
            {expanded ? "−" : "+"}
          </span>
        </button>
      </div>
      {expanded ? (
        <ul id={panelId} className="border-t border-border pb-2">
          {children}
        </ul>
      ) : null}
    </li>
  );
}
