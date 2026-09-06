"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Button } from "@/components/ui/Button";
import {
  submitContactForm,
  type ContactFormState,
} from "@/lib/contact/actions";
import { cn } from "@/lib/utils";

const initialState: ContactFormState = {
  status: "idle",
};

export function ContactForm() {
  const { dict, locale, path } = useLocale();
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div
        className="border border-border bg-white-warm p-8 md:p-10"
        role="status"
        aria-live="polite"
      >
        <p className="eyebrow text-accent">{dict.form.successEyebrow}</p>
        <h2 className="mt-4 text-2xl">{dict.form.successTitle}</h2>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-charcoal">
          {dict.form.successBody}
        </p>
      </div>
    );
  }

  return (
    <form
      key={state.revision ?? "idle"}
      action={formAction}
      className={cn("space-y-6", pending && "pointer-events-none")}
      noValidate
      aria-busy={pending}
      onSubmit={(event) => {
        if (pending) event.preventDefault();
      }}
    >
      <input type="hidden" name="locale" value={locale} />

      <div className="grid gap-6 md:grid-cols-2">
        <Field
          label={dict.form.name}
          name="name"
          required
          autoComplete="name"
          error={state.errors?.name}
          defaultValue={state.values?.name}
        />
        <Field
          label={dict.form.company}
          name="company"
          required
          autoComplete="organization"
          error={state.errors?.company}
          defaultValue={state.values?.company}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field
          label={dict.form.workEmail}
          name="email"
          type="email"
          required
          autoComplete="email"
          error={state.errors?.email}
          defaultValue={state.values?.email}
        />
        <Field
          label={dict.form.country}
          name="country"
          required
          autoComplete="country-name"
          error={state.errors?.country}
          defaultValue={state.values?.country}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="industry" className="eyebrow block">
            {dict.form.industry}
          </label>
          <select
            id="industry"
            name="industry"
            required
            aria-required="true"
            defaultValue={state.values?.industry ?? ""}
            className={fieldClass(Boolean(state.errors?.industry))}
            aria-invalid={Boolean(state.errors?.industry)}
            aria-describedby={
              state.errors?.industry ? "industry-error" : undefined
            }
          >
            <option value="" disabled>
              {dict.form.selectIndustry}
            </option>
            {dict.form.industryOptions.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
          {state.errors?.industry ? (
            <p id="industry-error" className="mt-2 text-sm text-accent" role="alert">
              {state.errors.industry}
            </p>
          ) : null}
        </div>
        <Field
          label={dict.form.phoneWeChat}
          name="phone"
          autoComplete="tel"
          optionalLabel={dict.common.optional}
          error={state.errors?.phone}
          defaultValue={state.values?.phone}
        />
      </div>

      <div>
        <label htmlFor="message" className="eyebrow block">
          {dict.form.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          aria-required="true"
          rows={6}
          defaultValue={state.values?.message}
          className={cn(fieldClass(Boolean(state.errors?.message)), "resize-y")}
          aria-invalid={Boolean(state.errors?.message)}
          aria-describedby={state.errors?.message ? "message-error" : undefined}
        />
        {state.errors?.message ? (
          <p id="message-error" className="mt-2 text-sm text-accent" role="alert">
            {state.errors.message}
          </p>
        ) : null}
      </div>

      <div
        className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
        aria-hidden
      >
        <label htmlFor="website">{dict.form.websiteHoneypot}</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <p className="text-sm leading-relaxed text-charcoal">
        {dict.form.privacyNote}{" "}
        <Link href={path("/privacy")} className="underline hover:text-accent">
          {dict.form.privacyLink}
        </Link>
        .
      </p>

      <div aria-live="assertive">
        {state.status === "error" && state.message ? (
          <p className="text-sm text-accent" role="alert">
            {state.message}
          </p>
        ) : null}
      </div>

      <span className="sr-only" aria-live="polite">
        {pending ? dict.form.sending : ""}
      </span>

      <Button
        type="submit"
        disabled={pending}
        showArrow={!pending}
        aria-disabled={pending}
      >
        {pending ? dict.form.sending : dict.form.submit}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  optionalLabel,
  error,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  optionalLabel?: string;
  error?: string;
  defaultValue?: string;
}) {
  const errorId = `${name}-error`;

  return (
    <div>
      <label htmlFor={name} className="eyebrow block">
        {label}
        {!required && optionalLabel ? ` (${optionalLabel})` : ""}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        aria-required={required || undefined}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        className={fieldClass(Boolean(error))}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-accent" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function fieldClass(hasError: boolean) {
  return cn(
    "mt-2 w-full border bg-white-warm px-4 py-3 text-[1rem] text-ink outline-none transition-colors",
    hasError ? "border-accent" : "border-border focus:border-ink",
  );
}
