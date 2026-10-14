"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
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
import { ServicesMegaMenu } from "@/components/layout/ServicesMegaMenu";
import { getIndustries, getServiceGroups } from "@/content/localized";
import { media } from "@/content/media";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/body-scroll-lock";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const MORPH_RANGE = 140;
/** Keep in sync with --radius-float / --radius-float-compact in globals.css */
const RADIUS_FLOAT = 22;
const RADIUS_FLOAT_COMPACT = 18;

export function SiteHeader() {
  const { dict, locale, path } = useLocale();
  const pathname = usePathname() || "/";
  const reduceMotion = useReducedMotion();
  const isHome =
    pathname === "/" ||
    pathname === `/${locale}` ||
    pathname === `/${locale}/`;
  const serviceGroups = getServiceGroups(locale, dict);
  const industries = getIndustries(locale, dict);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [immersive, setImmersive] = useState(isHome);
  const [isDesktop, setIsDesktop] = useState(true);

  const scrollYRef = useRef(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const insightsLinkRef = useRef<HTMLAnchorElement>(null);
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

  const panelOpen = servicesMenu.open || industriesMenu.open;

  const { scrollY } = useScroll();
  const boost = useMotionValue(0);
  const rawProgress = useTransform(scrollY, [0, MORPH_RANGE], [0, 1], {
    clamp: true,
  });
  const springProgress = useSpring(rawProgress, {
    stiffness: reduceMotion ? 1000 : 320,
    damping: reduceMotion ? 100 : 38,
    mass: reduceMotion ? 0.1 : 0.35,
  });

  const progress = useTransform(
    [springProgress, boost],
    ([scrollProgress, boostValue]) =>
      Math.min(1, Math.max(Number(scrollProgress), Number(boostValue))),
  );

  useMotionValueEvent(progress, "change", (value) => {
    if (!isHome) {
      setImmersive(false);
      return;
    }
    setImmersive(value < 0.42 && !panelOpen && !drawerOpen);
  });

  useEffect(() => {
    const controls = animate(boost, panelOpen || drawerOpen ? 1 : 0, {
      duration: reduceMotion ? 0 : 0.28,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [panelOpen, drawerOpen, boost, reduceMotion]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!isHome) {
      setImmersive(false);
      return;
    }
    setImmersive(
      window.scrollY < MORPH_RANGE * 0.42 && !panelOpen && !drawerOpen,
    );
  }, [isHome, panelOpen, drawerOpen]);

  const sideInset = useTransform(progress, (p) => {
    const max = isDesktop ? 48 : 12;
    return p * max;
  });
  const topInset = useTransform(progress, (p) => p * (isDesktop ? 10 : 8));
  const borderRadius = useTransform(
    progress,
    (p) => p * (isDesktop ? RADIUS_FLOAT : RADIUS_FLOAT_COMPACT),
  );
  const bgAlpha = useTransform(progress, (p) =>
    isHome ? p * 0.82 : 0.88 + p * 0.02,
  );
  const blurPx = useTransform(progress, (p) =>
    isHome ? p * 12 : 8 + p * 4,
  );
  const borderAlpha = useTransform(progress, (p) => p * 0.08);
  const shadowA = useTransform(progress, (p) => p * 0.1);
  const shadowB = useTransform(progress, (p) => p * 0.08);
  const navPadX = useTransform(progress, (p) => {
    const start = isDesktop ? 56 : 20;
    const end = isDesktop ? 28 : 16;
    return start + (end - start) * p;
  });

  const shellBackground = useMotionTemplate`rgba(243, 240, 232, ${bgAlpha})`;
  const shellFilter = useMotionTemplate`blur(${blurPx}px) saturate(1.2)`;
  const shellBorder = useMotionTemplate`1px solid rgba(18, 20, 23, ${borderAlpha})`;
  const shellShadow = useMotionTemplate`0 2px 10px rgba(18, 20, 23, ${shadowA}), 0 14px 36px rgba(18, 20, 23, ${shadowB})`;

  const logoDarkOpacity = useTransform(progress, (p) =>
    isHome ? Math.max(0, 1 - p * 2.2) : 0,
  );
  const logoLightOpacity = useTransform(progress, (p) =>
    isHome ? Math.min(1, p * 2.2) : 1,
  );

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

  const serviceMenuGroups = serviceGroups.map((group) => ({
    id: group.id,
    label: group.label,
    note: group.note,
    items: group.services.map((service) => ({
      key: service.slug,
      title: service.name,
      description: service.megaDescription,
      href: service.href,
    })),
  }));

  const industryItems = industries.map((industry) => ({
    key: industry.slug,
    number: industry.number,
    title: industry.name,
    description: industry.summary,
    href: industry.href,
  }));

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
    <>
      {/* Document-flow spacer on inner pages so fixed header does not cover content */}
      {!isHome ? (
        <div
          aria-hidden
          className="h-[4.25rem] shrink-0 md:h-[5rem]"
        />
      ) : null}

      <header
        ref={headerRef}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]"
      >
        <motion.div
          className={cn(
            "pointer-events-auto relative mx-auto will-change-transform",
            drawerOpen && "rounded-b-none",
          )}
          style={{
            marginLeft: sideInset,
            marginRight: sideInset,
            marginTop: topInset,
            borderRadius,
            backgroundColor: shellBackground,
            backdropFilter: shellFilter,
            WebkitBackdropFilter: shellFilter,
            border: shellBorder,
            boxShadow: shellShadow,
          }}
        >
          <motion.div
            className="flex h-[4.25rem] items-center justify-between gap-3 pr-[max(0px,env(safe-area-inset-right))] md:h-[5rem] md:gap-8"
            style={{ paddingLeft: navPadX, paddingRight: navPadX }}
          >
            <MorphLogo
              href={path("/")}
              darkOpacity={logoDarkOpacity}
              lightOpacity={logoLightOpacity}
            />

            <nav
              aria-label={dict.nav.aria.primary}
              className="hidden items-center gap-8 lg:flex xl:gap-9"
            >
              <SecondaryNavTrigger
                href={path("/services")}
                label={dict.nav.primary.services}
                open={servicesMenu.open}
                menuId={servicesMenu.menuId}
                openMenu={servicesMenu.openMenu}
                openFromKeyboard={servicesMenu.openFromKeyboard}
                scheduleClose={servicesMenu.scheduleClose}
                setTriggerRef={servicesMenu.setTriggerRef}
                onNavigate={closeDesktopPanels}
                inverted={immersive}
              />
              <SecondaryNavTrigger
                href={path("/industries")}
                label={dict.nav.primary.industries}
                open={industriesMenu.open}
                menuId={industriesMenu.menuId}
                openMenu={industriesMenu.openMenu}
                openFromKeyboard={industriesMenu.openFromKeyboard}
                scheduleClose={industriesMenu.scheduleClose}
                setTriggerRef={industriesMenu.setTriggerRef}
                onNavigate={closeDesktopPanels}
                inverted={immersive}
              />
              {primaryLinks.map((item) => {
                const isContact = item.href.endsWith("/contact");
                const isInsights = item.href.endsWith("/insights");
                return (
                  <Link
                    key={item.href}
                    ref={isInsights ? insightsLinkRef : undefined}
                    href={item.href}
                    className={cn(
                      "text-[0.9375rem] font-medium tracking-[-0.01em] transition-colors duration-200",
                      isContact
                        ? "text-accent hover:text-accent-dark"
                        : immersive
                          ? "text-white-warm/90 hover:text-white-warm"
                          : "text-ink hover:text-accent",
                    )}
                    onMouseEnter={closeDesktopPanels}
                    onFocus={closeDesktopPanels}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <span
                className={cn(
                  "mx-1 h-3 w-px transition-colors duration-200",
                  immersive ? "bg-white-warm/25" : "bg-border",
                )}
                aria-hidden
              />
              <LanguageSwitcher inverted={immersive} />
            </nav>

            <div className="flex items-center gap-3 lg:hidden">
              <LanguageSwitcher className="shrink-0" inverted={immersive} />
              <button
                ref={menuButtonRef}
                type="button"
                className={cn(
                  "inline-flex h-11 w-11 shrink-0 items-center justify-center border transition-[border-color,color,border-radius] duration-200",
                  immersive
                    ? "border-white-warm/35 text-white-warm"
                    : "rounded-control border-border text-ink",
                )}
                aria-expanded={drawerOpen}
                aria-controls="mobile-nav"
                aria-label={
                  drawerOpen ? dict.common.closeMenu : dict.common.openMenu
                }
                onClick={toggleDrawer}
              >
                <span className="sr-only">{dict.common.menu}</span>
                {drawerOpen ? (
                  <span className="relative block h-3.5 w-3.5" aria-hidden>
                    <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-45 bg-current" />
                    <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-45 bg-current" />
                  </span>
                ) : (
                  <span className="flex w-4 flex-col gap-1.5" aria-hidden>
                    <span className="h-px w-full bg-current" />
                    <span className="h-px w-full bg-current" />
                    <span className="h-px w-full bg-current" />
                  </span>
                )}
              </button>
            </div>
          </motion.div>

          <ServicesMegaMenu
            open={servicesMenu.open}
            menuId={servicesMenu.menuId}
            ariaLabel={dict.nav.aria.servicesMenu}
            groups={serviceMenuGroups}
            viewAllHref={path("/services")}
            viewAllLabel={dict.nav.megaMenu.viewAll}
            openMenu={servicesMenu.openMenu}
            scheduleClose={servicesMenu.scheduleClose}
            closeMenu={servicesMenu.closeMenu}
            focusTrigger={servicesMenu.focusTrigger}
            onExitForward={() => industriesMenu.focusTrigger()}
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
            focusTrigger={industriesMenu.focusTrigger}
            onExitForward={() => insightsLinkRef.current?.focus()}
            setPanelRef={industriesMenu.setPanelRef}
          />

          <AnimatePresence initial={false}>
            {drawerOpen ? (
              <motion.div
                id="mobile-nav"
                ref={drawerRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={drawerTitleId}
                initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden border-t border-black/[0.06] lg:hidden"
              >
                <p id={drawerTitleId} className="sr-only">
                  {dict.nav.aria.mobile}
                </p>
                <nav
                  aria-label={dict.nav.aria.mobile}
                  className="max-h-[min(70dvh,32rem)] overflow-y-auto overscroll-contain px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-6"
                >
                  <ul className="flex flex-col">
                    <MobileExpandableSection
                      href={path("/services")}
                      label={dict.nav.primary.services}
                      expanded={mobileServicesOpen}
                      onToggle={() =>
                        setMobileServicesOpen((value) => !value)
                      }
                      expandLabel={dict.nav.aria.expandServices}
                      collapseLabel={dict.nav.aria.collapseServices}
                      onNavigate={closeDrawer}
                    >
                      {serviceGroups.map((group) => (
                        <li key={group.id} className="pt-3">
                          <p className="eyebrow text-accent">{group.label}</p>
                          <ul className="mt-1">
                            {group.services.map((service) => (
                              <li key={service.slug}>
                                <Link
                                  href={service.href}
                                  className="block py-2.5 text-[1rem] font-medium leading-snug text-ink"
                                  onClick={closeDrawer}
                                >
                                  {service.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                      <li className="border-t border-border/70">
                        <Link
                          href={path("/services")}
                          className="flex items-center justify-between py-3 text-[1rem] font-medium text-accent"
                          onClick={closeDrawer}
                        >
                          <span>{dict.nav.megaMenu.viewAll}</span>
                          <span aria-hidden>→</span>
                        </Link>
                      </li>
                    </MobileExpandableSection>

                    <MobileExpandableSection
                      href={path("/industries")}
                      label={dict.nav.primary.industries}
                      expanded={mobileIndustriesOpen}
                      onToggle={() =>
                        setMobileIndustriesOpen((value) => !value)
                      }
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
                            <span className="font-medium text-ink">
                              {industry.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </MobileExpandableSection>

                    {primaryLinks.map((item) => (
                      <li key={item.href} className="border-b border-border/70">
                        <Link
                          href={item.href}
                          className="flex items-center justify-between py-4 text-lg font-medium"
                          onClick={closeDrawer}
                        >
                          <span
                            className={
                              item.href.endsWith("/contact")
                                ? "text-accent"
                                : "text-ink"
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
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </header>
    </>
  );
}

function MorphLogo({
  href,
  darkOpacity,
  lightOpacity,
}: {
  href: string;
  darkOpacity: MotionValue<number>;
  lightOpacity: MotionValue<number>;
}) {
  const dark = media.brand.logoDark;
  const light = media.brand.logoLight;

  return (
    <Link
      href={href}
      className="relative inline-flex h-9 w-[7.5rem] shrink-0 items-center focus-visible:outline-offset-4 md:h-11 md:w-[9.25rem]"
      aria-label={`${siteConfig.legalName} home`}
    >
      <motion.span
        className="absolute inset-0 flex items-center"
        style={{ opacity: darkOpacity }}
      >
        <Image
          src={dark.src}
          alt=""
          width={dark.width}
          height={dark.height}
          priority
          sizes="180px"
          className="h-9 w-auto md:h-11"
        />
      </motion.span>
      <motion.span
        className="absolute inset-0 flex items-center"
        style={{ opacity: lightOpacity }}
      >
        <Image
          src={light.src}
          alt=""
          width={light.width}
          height={light.height}
          priority
          sizes="180px"
          className="h-9 w-auto md:h-11"
        />
      </motion.span>
    </Link>
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
    <li className="border-b border-border/70">
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
        <ul id={panelId} className="border-t border-border/70 pb-2">
          {children}
        </ul>
      ) : null}
    </li>
  );
}
