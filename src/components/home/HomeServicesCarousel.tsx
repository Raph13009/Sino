"use client";

import {
  CardArrowIcon,
  OpopaBrandField,
  ServiceIcon,
} from "@/components/home/serviceMarks";
import type { HomeServiceCardSlug } from "@/content/catalog";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export type HomeServiceItem = {
  slug: HomeServiceCardSlug;
  href: string;
  name: string;
  description: string;
};

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="none">
      <path
        d="M14.5 6.5 9 12l5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="none">
      <path
        d="M9.5 6.5 15 12l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServiceCard({ service }: { service: HomeServiceItem }) {
  return (
    <Link
      href={service.href}
      className="group relative flex min-h-[20rem] w-full shrink-0 cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-white-warm p-6 pt-7 no-underline transition-colors duration-300 hover:border-accent hover:bg-accent focus-visible:outline-offset-2 active:border-accent active:bg-accent"
    >
      <OpopaBrandField size="compact" />

      <h3 className="relative z-10 text-[1.25rem] leading-snug tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-white-warm group-active:text-white-warm">
        {service.name}
      </h3>
      <p className="relative z-10 mt-3 text-[0.9375rem] leading-relaxed text-charcoal transition-colors duration-300 group-hover:text-white-warm group-active:text-white-warm">
        {service.description}
      </p>

      <div className="relative z-20 mt-auto pt-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white-warm transition-colors duration-300 group-hover:bg-white-warm group-hover:text-accent group-active:bg-white-warm group-active:text-accent">
          <CardArrowIcon />
        </span>
      </div>

      <ServiceIcon
        slug={service.slug}
        className="absolute right-4 bottom-4 z-10 h-8 w-8 text-white-warm"
      />
    </Link>
  );
}

export function HomeServicesCarousel({
  services,
  prevLabel,
  nextLabel,
}: {
  services: HomeServiceItem[];
  prevLabel: string;
  nextLabel: string;
}) {
  const count = services.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (direction: 1 | -1) => {
      setIndex((current) => (current + direction + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (count <= 1 || paused) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [count, index, paused]);

  if (count === 0) return null;

  return (
    <div
      className="mt-8 md:hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {services.map((service) => (
            <div key={service.slug} className="w-full shrink-0 px-1">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={prevLabel}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#8aa4bc] text-[#6b86a0] transition-colors hover:border-ink hover:text-ink"
        >
          <ChevronLeftIcon />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={nextLabel}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#8aa4bc] text-[#6b86a0] transition-colors hover:border-ink hover:text-ink"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
