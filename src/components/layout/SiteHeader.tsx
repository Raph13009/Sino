"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { ServicesMegaMenu } from "@/components/layout/ServicesMegaMenu";
import { Logo } from "@/components/ui/Logo";
import { getServices } from "@/content/localized";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { dict, locale, path } = useLocale();
  const services = getServices(locale, dict);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const primaryNav = [
    { label: dict.nav.primary.industries, href: path("/industries") },
    { label: dict.nav.primary.insights, href: path("/insights") },
    { label: dict.nav.primary.about, href: path("/about") },
    { label: dict.nav.primary.contact, href: path("/contact") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/80 bg-ivory/95 backdrop-blur-sm transition-shadow duration-200",
        scrolled && "shadow-[0_1px_0_rgba(23,26,31,0.06)]",
      )}
    >
      <div className="container-editorial flex h-16 items-center justify-between gap-6 md:h-20">
        <Logo priority href={path("/")} />

        <nav
          aria-label={dict.nav.aria.primary}
          className="hidden items-center gap-7 lg:flex xl:gap-8"
        >
          <ServicesMegaMenu
            open={servicesOpen}
            onOpenChange={setServicesOpen}
          />
          {primaryNav.map((item) => {
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
              >
                {item.label}
              </Link>
            );
          })}
          <span className="mx-1 h-3 w-px bg-border" aria-hidden />
          <LanguageSwitcher />
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center border border-border lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? dict.common.closeMenu : dict.common.openMenu}
          onClick={() => {
            setOpen((value) => {
              if (value) setMobileServicesOpen(false);
              return !value;
            });
          }}
        >
          <span className="sr-only">{dict.common.menu}</span>
          <span className="flex w-4 flex-col gap-1.5" aria-hidden>
            <span
              className={cn(
                "h-px w-full bg-ink transition-transform",
                open && "translate-y-[3.5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "h-px w-full bg-ink transition-opacity",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "h-px w-full bg-ink transition-transform",
                open && "-translate-y-[3.5px] -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-border bg-ivory lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav aria-label={dict.nav.aria.mobile} className="container-editorial py-6">
          <ul className="flex flex-col">
            <li className="border-b border-border">
              <button
                type="button"
                className="flex w-full items-center justify-between py-4 text-left text-lg font-medium text-ink"
                aria-expanded={mobileServicesOpen}
                onClick={() => setMobileServicesOpen((value) => !value)}
              >
                <span>{dict.nav.primary.services}</span>
                <span aria-hidden className="text-charcoal">
                  {mobileServicesOpen ? "−" : "+"}
                </span>
              </button>
              {mobileServicesOpen ? (
                <ul className="border-t border-border pb-2">
                  {services.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={service.href}
                        className="flex items-start gap-3 py-3 pl-1 text-[1rem]"
                        onClick={() => setOpen(false)}
                      >
                        <span className="eyebrow mt-0.5 shrink-0 text-accent">
                          {service.number}
                        </span>
                        <span className="font-medium text-ink">{service.name}</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href={path("/services")}
                      className="flex items-center justify-between py-3 text-[0.9375rem] font-medium text-charcoal"
                      onClick={() => setOpen(false)}
                    >
                      <span>{dict.nav.megaMenu.viewAll}</span>
                      <span aria-hidden>→</span>
                    </Link>
                  </li>
                </ul>
              ) : null}
            </li>

            {primaryNav.map((item) => (
              <li key={item.href} className="border-b border-border">
                <Link
                  href={item.href}
                  className="flex items-center justify-between py-4 text-lg font-medium"
                  onClick={() => setOpen(false)}
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
          <div className="mt-6 border-t border-border pt-5">
            <p className="eyebrow mb-3">{dict.common.language}</p>
            <LanguageSwitcher onNavigate={() => setOpen(false)} />
          </div>
        </nav>
      </div>
    </header>
  );
}
