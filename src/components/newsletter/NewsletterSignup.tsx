"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleProvider";
import {
  subscribeNewsletter,
  type NewsletterFormState,
} from "@/lib/newsletter/actions";
import { cn } from "@/lib/utils";

const initialState: NewsletterFormState = {
  status: "idle",
};

export function NewsletterSignup() {
  const { dict, locale, path } = useLocale();
  const [state, formAction, pending] = useActionState(
    subscribeNewsletter,
    initialState,
  );

  return (
    <section
      className="bg-accent text-white-warm"
      aria-labelledby="newsletter-heading"
    >
      <div className="container-editorial py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-6">
            <p className="eyebrow text-white-warm/80">{dict.newsletter.eyebrow}</p>
            <h2
              id="newsletter-heading"
              className="mt-4 max-w-xl font-display text-[2rem] leading-[1.15] tracking-[-0.02em] !text-white-warm md:text-[2.5rem]"
            >
              {dict.newsletter.title}
            </h2>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-white-warm/85">
              {dict.newsletter.body}
            </p>
          </div>

          <div className="lg:col-span-6">
            {state.status === "success" ? (
              <p
                className="text-[1.0625rem] leading-relaxed text-white-warm"
                role="status"
                aria-live="polite"
              >
                {state.message ?? dict.newsletter.successBody}
              </p>
            ) : (
              <form
                key={state.revision ?? "idle"}
                action={formAction}
                className={cn(
                  "relative flex flex-col gap-3 sm:flex-row sm:items-stretch",
                  pending && "pointer-events-none opacity-70",
                )}
                noValidate
                aria-busy={pending}
              >
                <input type="hidden" name="locale" value={locale} />
                <div
                  className="absolute left-[-10000px] h-0 w-0 overflow-hidden"
                  aria-hidden="true"
                >
                  <label htmlFor="newsletter-website">Website</label>
                  <input
                    id="newsletter-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <label htmlFor="newsletter-email" className="sr-only">
                    {dict.newsletter.emailLabel}
                  </label>
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    defaultValue={state.values?.email}
                    placeholder={dict.newsletter.placeholder}
                    aria-invalid={Boolean(state.errors?.email)}
                    aria-describedby={
                      state.errors?.email ? "newsletter-email-error" : undefined
                    }
                    className="h-14 w-full border-0 bg-white-warm px-4 text-[0.9375rem] text-ink placeholder:text-charcoal/50 outline-none ring-2 ring-transparent transition focus:ring-ink/20"
                  />
                  {state.errors?.email ? (
                    <p
                      id="newsletter-email-error"
                      className="mt-2 text-sm text-white-warm"
                    >
                      {state.errors.email}
                    </p>
                  ) : null}
                  {state.status === "error" && state.message ? (
                    <p className="mt-2 text-sm text-white-warm" role="alert">
                      {state.message}
                    </p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  disabled={pending}
                  className="h-14 shrink-0 border border-white-warm bg-white-warm px-7 text-[0.8125rem] font-medium tracking-[0.08em] text-accent uppercase transition-colors hover:bg-transparent hover:text-white-warm disabled:cursor-wait disabled:opacity-70"
                >
                  {pending
                    ? dict.newsletter.submitting
                    : dict.newsletter.submit}
                </button>
              </form>
            )}

            <p className="mt-5 text-sm leading-relaxed text-white-warm/80">
              {dict.newsletter.consent}
            </p>
            <p className="mt-2 text-sm text-white-warm/65">
              <Link
                href={path("/privacy")}
                className="underline decoration-white-warm/35 underline-offset-4 transition-colors hover:text-white-warm hover:decoration-white-warm"
              >
                {dict.newsletter.privacyLink}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
