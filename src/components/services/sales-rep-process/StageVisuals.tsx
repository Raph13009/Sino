"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import type { SalesRepProcessVisuals } from "./types";

const ease = [0.22, 1, 0.36, 1] as const;

function StageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full min-h-[inherit] w-full flex-col overflow-hidden rounded-[1.25rem] bg-ink text-white-warm",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(176,30,40,0.22),transparent_55%)]"
        aria-hidden
      />
      <div className="relative z-[1] flex flex-1 flex-col p-5 md:p-7">
        {children}
      </div>
    </div>
  );
}

export function MandateStage({
  data,
  active,
}: {
  data: SalesRepProcessVisuals["mandate"];
  active: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <StageShell>
      <div className="grid flex-1 grid-cols-2 gap-2.5 content-center md:gap-3">
        {data.chips.map((chip, i) => (
          <motion.div
            key={chip.label}
            initial={reduce ? false : { opacity: 0, y: 18, scale: 0.96 }}
            animate={
              active
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0.35, y: 8, scale: 0.98 }
            }
            transition={{ duration: 0.45, delay: active ? i * 0.08 : 0, ease }}
            className="rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-3 backdrop-blur-sm"
          >
            <p className="text-[0.625rem] uppercase tracking-[0.12em] text-white/45">
              {chip.label}
            </p>
            <p className="mt-1.5 text-[0.9rem] font-medium tracking-[-0.02em]">
              {chip.value}
            </p>
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: active ? 1 : 0.3 }}
        transition={{ delay: active ? 0.4 : 0, duration: 0.4 }}
        className="mt-5 flex items-center gap-2 text-[0.8125rem] text-[#f0a8ac]"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[0.65rem] text-white">
          ✓
        </span>
        {data.status}
      </motion.p>
    </StageShell>
  );
}

export function SourcingStage({
  data,
  active,
}: {
  data: SalesRepProcessVisuals["sourcing"];
  active: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <StageShell>
      <div className="grid flex-1 gap-5 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p className="mb-3 text-[0.625rem] uppercase tracking-[0.12em] text-white/40">
            {data.poolLabel}
          </p>
          <div className="relative mx-auto aspect-square max-w-[13rem]">
            <div className="absolute inset-[18%] rounded-full border border-dashed border-white/15" />
            <div className="absolute inset-[36%] rounded-full border border-white/10" />
            {data.profiles.map((p, i) => {
              const angle = (i / data.profiles.length) * Math.PI * 2 - Math.PI / 2;
              const r = 42;
              const x = 50 + Math.cos(angle) * r;
              const y = 50 + Math.sin(angle) * r;
              return (
                <motion.span
                  key={p.name}
                  className={cn(
                    "absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[0.6rem] font-medium",
                    p.tag
                      ? "bg-accent text-white shadow-[0_0_24px_rgba(176,30,40,0.55)]"
                      : "bg-white/10 text-white/50",
                  )}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  initial={reduce ? false : { scale: 0, opacity: 0 }}
                  animate={
                    active
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0.8, opacity: 0.4 }
                  }
                  transition={{
                    delay: active ? 0.08 * i : 0,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  {p.place.slice(0, 2)}
                </motion.span>
              );
            })}
          </div>
        </div>
        <div>
          <p className="mb-3 text-[0.625rem] uppercase tracking-[0.12em] text-[#f0a8ac]">
            {data.shortlistLabel}
          </p>
          <ul className="space-y-2">
            {data.profiles
              .filter((p) => p.tag)
              .map((p, i) => (
                <motion.li
                  key={p.name}
                  initial={reduce ? false : { opacity: 0, x: 16 }}
                  animate={
                    active ? { opacity: 1, x: 0 } : { opacity: 0.35, x: 8 }
                  }
                  transition={{
                    delay: active ? 0.28 + i * 0.1 : 0,
                    duration: 0.4,
                    ease,
                  }}
                  className="rounded-xl border border-accent/40 bg-accent/15 px-3.5 py-2.5"
                >
                  <p className="text-[0.875rem] font-medium">{p.name}</p>
                  <p className="text-[0.75rem] text-white/50">{p.place}</p>
                </motion.li>
              ))}
          </ul>
        </div>
      </div>
    </StageShell>
  );
}

export function ApprovalStage({
  data,
  active,
}: {
  data: SalesRepProcessVisuals["approval"];
  active: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <StageShell>
      <p className="mb-5 text-[0.875rem] text-white/55">{data.note}</p>
      <ul className="flex flex-1 flex-col justify-center gap-3">
        {data.profiles.map((p, i) => (
          <motion.li
            key={p.name}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 6 }}
            transition={{ delay: active ? i * 0.12 : 0, duration: 0.4, ease }}
            className={cn(
              "flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5",
              p.approved && active
                ? "border-accent/50 bg-accent/20"
                : "border-white/10 bg-white/[0.04]",
            )}
          >
            <p className="text-[0.9375rem] font-medium tracking-[-0.02em]">
              {p.name}
            </p>
            <span
              className={cn(
                "shrink-0 text-[0.75rem] font-medium",
                p.approved && active ? "text-[#f0a8ac]" : "text-white/35",
              )}
            >
              {p.approved && active ? `✓ ${data.approve}` : data.pending}
            </span>
          </motion.li>
        ))}
      </ul>
    </StageShell>
  );
}

export function LaunchStage({
  data,
  active,
}: {
  data: SalesRepProcessVisuals["launch"];
  active: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <StageShell>
      <ul className="flex flex-1 flex-col justify-center gap-0">
        {data.items.map((item, i) => (
          <motion.li
            key={item}
            initial={reduce ? false : { opacity: 0, x: -10 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0.35, x: 0 }}
            transition={{ delay: active ? i * 0.09 : 0, duration: 0.35, ease }}
            className="relative flex items-center gap-3.5 py-2.5 pl-1"
          >
            {i < data.items.length - 1 ? (
              <span
                className="absolute top-7 left-[7px] h-[calc(100%-0.5rem)] w-px bg-white/10"
                aria-hidden
              />
            ) : null}
            <motion.span
              className="relative z-[1] h-3.5 w-3.5 shrink-0 rounded-full border-2 border-ink"
              animate={{
                backgroundColor: active ? "#b01e28" : "rgba(255,255,255,0.2)",
                boxShadow: active
                  ? "0 0 16px rgba(176,30,40,0.6)"
                  : "none",
              }}
              transition={{ delay: active ? i * 0.09 : 0 }}
            />
            <span className="text-[0.975rem] tracking-[-0.02em]">{item}</span>
          </motion.li>
        ))}
      </ul>
    </StageShell>
  );
}

export function MonitorStage({
  data,
  active,
}: {
  data: SalesRepProcessVisuals["monitor"];
  active: boolean;
}) {
  const reduce = useReducedMotion();
  const widths = ["78%", "58%", "66%"];

  return (
    <StageShell>
      <ul className="space-y-4">
        {data.metrics.map((label, i) => (
          <li key={label}>
            <div className="mb-2 flex justify-between text-[0.8125rem]">
              <span className="text-white/70">{label}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={reduce ? false : { width: "0%" }}
                animate={{ width: active ? widths[i] : "14%" }}
                transition={{
                  duration: 0.75,
                  delay: active ? 0.1 + i * 0.1 : 0,
                  ease,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-auto grid gap-2.5 pt-6 sm:grid-cols-2">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: active ? 1 : 0.35, y: active ? 0 : 4 }}
          transition={{ delay: active ? 0.45 : 0 }}
          className="rounded-xl border border-white/10 bg-white/[0.05] px-3.5 py-3 text-[0.8125rem]"
        >
          {data.reporting}
        </motion.div>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: active ? 1 : 0.35, y: active ? 0 : 4 }}
          transition={{ delay: active ? 0.55 : 0 }}
          className="rounded-xl border border-accent/35 bg-accent/15 px-3.5 py-3 text-[0.8125rem] text-[#f0a8ac]"
        >
          {data.adjust}
        </motion.div>
      </div>
    </StageShell>
  );
}

export function StageVisual({
  index,
  visuals,
  active,
}: {
  index: number;
  visuals: SalesRepProcessVisuals;
  active: boolean;
}) {
  switch (index) {
    case 0:
      return <MandateStage data={visuals.mandate} active={active} />;
    case 1:
      return <SourcingStage data={visuals.sourcing} active={active} />;
    case 2:
      return <ApprovalStage data={visuals.approval} active={active} />;
    case 3:
      return <LaunchStage data={visuals.launch} active={active} />;
    default:
      return <MonitorStage data={visuals.monitor} active={active} />;
  }
}
