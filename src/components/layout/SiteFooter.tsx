"use client";

import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Logo } from "@/components/ui/Logo";
import { getServiceGroups } from "@/content/localized";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  const { dict, locale, path } = useLocale();
  const serviceGroups = getServiceGroups(locale, dict);

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
    <footer className="bg-ink text-white-warm">
      <div className="container-editorial py-20 md:py-28">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Logo variant="dark" href={path("/")} />
            <p className="mt-8 max-w-md text-[1.0625rem] leading-relaxed text-white-warm/60">
              {dict.footer.description}
            </p>
            <p className="eyebrow mt-10 text-accent">{dict.footer.tagline}</p>
          </div>

          <div className="grid gap-12 sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="eyebrow text-accent">{dict.nav.footer.services}</p>
              <div className="mt-5 space-y-6">
                {serviceGroups.map((group) => (
                  <div key={group.id}>
                    <Link
                      href={group.href}
                      className="text-[0.8125rem] font-medium tracking-[0.06em] text-white-warm/55 uppercase transition-colors hover:text-white-warm"
                    >
                      {group.label}
                    </Link>
                    <ul className="mt-3 space-y-2.5 text-[0.9375rem]">
                      {group.services.map((service) => (
                        <li key={service.slug}>
                          <Link
                            href={service.href}
                            className={
                              service.supporting
                                ? "text-white-warm/50 transition-colors hover:text-white-warm"
                                : "text-white-warm/75 transition-colors hover:text-white-warm"
                            }
                          >
                            {service.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <FooterColumn title={dict.nav.footer.industries} links={industries} />
            <div>
              <FooterColumn title={dict.nav.footer.company} links={company} />
              <div className="mt-10">
                <p className="eyebrow text-accent">{dict.nav.footer.connect}</p>
                <ul className="mt-5 space-y-3 text-[0.9375rem]">
                  <li>
                    <a
                      href={siteConfig.companyLinkedIn}
                      className="text-white-warm/75 transition-colors hover:text-white-warm"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-white-warm/75 transition-colors hover:text-white-warm"
                    >
                      {siteConfig.email}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-5 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-white-warm/40">
            © {new Date().getFullYear()} {siteConfig.legalName}.{" "}
            {dict.common.allRightsReserved}
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white-warm/40">
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
      <p className="eyebrow text-accent">{title}</p>
      <ul className="mt-5 space-y-3 text-[0.9375rem]">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-white-warm/75 transition-colors hover:text-white-warm"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
