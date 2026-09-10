"use client";

import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Logo } from "@/components/ui/Logo";
import { getServices } from "@/content/localized";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  const { dict, locale, path } = useLocale();
  const serviceLinks = getServices(locale, dict).map((service) => ({
    label: service.name,
    href: service.href,
  }));

  const industries = [
    {
      label: dict.industries["industrial-equipment"].name,
      href: path("/industries/industrial-equipment"),
    },
    {
      label: dict.industries["advanced-manufacturing"].name,
      href: path("/industries/advanced-manufacturing"),
    },
    {
      label: dict.industries["green-technology"].name,
      href: path("/industries/green-technology"),
    },
    {
      label: dict.industries["mobility-infrastructure"].name,
      href: path("/industries/mobility-infrastructure"),
    },
  ];

  const company = [
    { label: dict.nav.primary.insights, href: path("/insights") },
    { label: dict.nav.primary.about, href: path("/about") },
    { label: dict.nav.primary.contact, href: path("/contact") },
  ];

  const legal = [
    { label: dict.nav.footer.legalNotice, href: path("/legal") },
    { label: dict.nav.footer.privacyPolicy, href: path("/privacy") },
  ];

  return (
    <footer className="border-t border-border-dark bg-ink text-white-warm">
      <div className="container-editorial py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo variant="dark" href={path("/")} />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-white-warm/70">
              {dict.footer.description}
            </p>
            <p className="eyebrow eyebrow-accent mt-8">{dict.footer.tagline}</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-3">
            <FooterColumn title={dict.nav.footer.services} links={serviceLinks} />
            <FooterColumn title={dict.nav.footer.industries} links={industries} />
            <div>
              <FooterColumn title={dict.nav.footer.company} links={company} />
              <div className="mt-8">
                <p className="eyebrow eyebrow-accent">{dict.nav.footer.connect}</p>
                <ul className="mt-4 space-y-3 text-[0.9375rem]">
                  <li>
                    <a
                      href={siteConfig.linkedIn}
                      className="text-white-warm transition-colors hover:text-accent"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-white-warm transition-colors hover:text-accent"
                    >
                      {siteConfig.email}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border-dark pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-white-warm/55">
            © {new Date().getFullYear()} {siteConfig.legalName}.{" "}
            {dict.common.allRightsReserved}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white-warm/55">
            {legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-white-warm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="eyebrow eyebrow-accent">{title}</p>
      <ul className="mt-4 space-y-3 text-[0.9375rem]">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-white-warm transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
