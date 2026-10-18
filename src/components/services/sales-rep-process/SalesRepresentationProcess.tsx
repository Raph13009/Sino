"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { Container, Eyebrow } from "@/components/ui/Section";
import { getLenisInstance } from "@/lib/lenis-instance";
import { cn } from "@/lib/utils";
import { StageVisual } from "./StageVisuals";
import type { SalesRepProcessContent } from "./types";

const STEP_COUNT = 5;

/**
 * Pinned full-viewport process:
 * text + visualisation share the same sticky frame,
 * so nothing scrolls away while a stage is active.
 */
export function SalesRepresentationProcess({
  process,
}: {
  process: SalesRepProcessContent;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <StaticProcess process={process} />;
  }

  return <PinnedProcess process={process} />;
}

function StaticProcess({ process }: { process: SalesRepProcessContent }) {
  return (
    <section id="how-it-works" className="bg-concrete py-16 md:py-24">
      <Container>
        <Header process={process} />
        <ol className="mt-12 space-y-12">
          {process.steps.map((step, index) => (
            <li key={step.number} className="grid gap-5 md:grid-cols-2">
              <div>
                <p className="text-[0.75rem] tracking-[0.12em] text-accent">
                  {step.number}
                </p>
                <h3 className="mt-2 text-[1.35rem] font-medium tracking-[-0.025em]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.975rem] leading-relaxed text-charcoal">
                  {step.description}
                </p>
              </div>
              <StageVisual
                index={index}
                visuals={process.visuals}
                active
              />
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function PinnedProcess({ process }: { process: SalesRepProcessContent }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.001,
  });

  const progressWidth = useTransform(smooth, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(
      STEP_COUNT - 1,
      Math.max(0, Math.floor(v * STEP_COUNT - 1e-6)),
    );
    setActive((prev) => (prev === next ? prev : next));
  });

  const step = process.steps[active] ?? process.steps[0];

  return (
    <section id="how-it-works" className="bg-concrete">
      {/* Compact intro — leaves quickly */}
      <Container className="pt-16 pb-8 md:pt-24 md:pb-10">
        <Header process={process} />
      </Container>

      {/* Scroll track: ~4 viewports — enough dwell without fatigue */}
      <div ref={trackRef} className="relative h-[400vh]">
        <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden pt-[var(--header-h)]">
          <Container className="flex h-[min(calc(100svh-var(--header-h)),48rem)] max-h-[calc(100svh-var(--header-h))] flex-col py-3 md:py-5">
            {/* Top meta */}
            <div className="mb-4 flex items-center justify-between gap-4 md:mb-6">
              <p className="text-[0.6875rem] uppercase tracking-[0.14em] text-charcoal/70">
                {process.eyebrow}
              </p>
              <p className="tabular-nums text-[0.8125rem] tracking-[0.08em] text-charcoal">
                <span className="font-medium text-ink">
                  {step.number}
                </span>
                <span className="mx-1.5 text-border">/</span>
                <span className="text-charcoal/60">
                  {String(STEP_COUNT).padStart(2, "0")}
                </span>
              </p>
            </div>

            {/* Progress rail */}
            <div className="mb-6 h-[2px] w-full overflow-hidden rounded-full bg-border md:mb-8">
              <motion.div
                className="h-full origin-left bg-accent"
                style={{ width: progressWidth }}
              />
            </div>

            {/* Stage: copy + visual stay co-visible */}
            <div className="grid min-h-0 flex-1 gap-5 lg:grid-cols-12 lg:gap-12 lg:items-stretch">
              <div className="relative flex flex-col justify-center lg:col-span-4">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="text-[0.75rem] font-medium tracking-[0.16em] text-accent">
                      {step.number}
                    </p>
                    <h3 className="mt-3 text-[1.55rem] font-medium leading-[1.12] tracking-[-0.03em] text-ink md:text-[2rem]">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-[1rem] leading-relaxed text-charcoal md:text-[1.0625rem]">
                      {step.description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {active === 0 ? (
                  <p className="mt-6 text-[0.75rem] tracking-[0.08em] text-charcoal/50">
                    ↓ {process.scrollHint}
                  </p>
                ) : null}

                <nav
                  aria-label={process.title}
                  className="mt-6 flex gap-2"
                >
                  {process.steps.map((s, i) => (
                    <button
                      key={s.number}
                      type="button"
                      aria-label={s.title}
                      aria-current={i === active ? "step" : undefined}
                      onClick={() => {
                        const el = trackRef.current;
                        if (!el) return;
                        const top =
                          el.getBoundingClientRect().top + window.scrollY;
                        const range = Math.max(
                          el.offsetHeight - window.innerHeight,
                          1,
                        );
                        const target =
                          top + ((i + 0.35) / STEP_COUNT) * range;
                        const lenis = getLenisInstance();
                        if (lenis) lenis.scrollTo(target, { duration: 0.85 });
                        else window.scrollTo({ top: target, behavior: "smooth" });
                      }}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                        i === active
                          ? "w-8 bg-accent"
                          : "w-1.5 bg-border hover:bg-charcoal/40",
                      )}
                    />
                  ))}
                </nav>
              </div>

              <div className="flex min-h-0 flex-col lg:col-span-8">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
                    transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-full min-h-[18rem] flex-col md:min-h-[24rem]"
                  >
                    <div className="min-h-0 flex-1">
                      <StageVisual
                        index={active}
                        visuals={process.visuals}
                        active
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
                <p className="mt-2 text-right text-[0.625rem] uppercase tracking-[0.1em] text-charcoal/45">
                  {process.illustrative}
                </p>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}

function Header({ process }: { process: SalesRepProcessContent }) {
  return (
    <div className="max-w-2xl">
      <Eyebrow>{process.eyebrow}</Eyebrow>
      <h2 className="mt-4 text-[1.75rem] leading-tight tracking-[-0.03em] md:text-[2.35rem]">
        {process.title}
      </h2>
      <p className="mt-4 text-lg leading-relaxed text-charcoal">
        {process.subtitle}
      </p>
    </div>
  );
}
