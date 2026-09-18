"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

export type FounderIntroVideoCopy = {
  label: string;
  playWithSound: string;
  play: string;
  pause: string;
  mute: string;
  unmute: string;
};

type Mode = "ambient" | "sound";

const TRANSITION_MS = 260;

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function seekToStart(video: HTMLVideoElement) {
  return new Promise<void>((resolve) => {
    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      video.removeEventListener("seeked", done);
      resolve();
    };

    if (video.currentTime === 0 && !video.seeking) {
      done();
      return;
    }

    video.addEventListener("seeked", done);
    video.currentTime = 0;
    window.setTimeout(done, 600);
  });
}

function ControlButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex min-h-11 items-center gap-2.5 rounded-[var(--radius-sm)] bg-ink px-5 py-2.5 text-[0.9375rem] font-medium tracking-[-0.01em] text-white-warm transition-colors hover:bg-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white-warm"
    >
      {children}
    </button>
  );
}

export function FounderIntroVideo({ copy }: { copy: FounderIntroVideoCopy }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const busyRef = useRef(false);
  const modeRef = useRef<Mode>("ambient");
  const [mode, setMode] = useState<Mode>("ambient");
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [veiled, setVeiled] = useState(false);
  const [showMobilePlay, setShowMobilePlay] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => true,
  );

  const applyAmbient = useCallback(async (shouldPlay: boolean) => {
    const video = videoRef.current;
    if (!video) return;
    video.loop = true;
    video.muted = true;
    video.defaultMuted = true;
    video.currentTime = 0;
    setMode("ambient");
    setMuted(true);
    setShowMobilePlay(false);
    if (!shouldPlay) {
      video.pause();
      setPlaying(false);
      return;
    }
    try {
      await video.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || modeRef.current === "sound") return;
    video.loop = true;
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    if (reducedMotion) {
      video.pause();
      return;
    }
    void video.play().catch(() => undefined);
  }, [reducedMotion]);

  const veil = useCallback(async () => {
    setVeiled(true);
    await wait(TRANSITION_MS);
  }, []);

  const unveil = useCallback(async () => {
    await wait(40);
    setVeiled(false);
  }, []);

  const playWithSound = useCallback(async () => {
    const video = videoRef.current;
    if (!video || busyRef.current || modeRef.current === "sound") return;
    busyRef.current = true;

    try {
      video.pause();
      video.muted = false;
      video.defaultMuted = false;

      if (!reducedMotion) {
        await veil();
      }

      video.loop = false;
      await seekToStart(video);
      setMode("sound");
      setMuted(false);
      setShowMobilePlay(false);

      try {
        await video.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }

      if (!reducedMotion) {
        await unveil();
      }
    } finally {
      busyRef.current = false;
    }
  }, [reducedMotion, unveil, veil]);

  const returnToAmbient = useCallback(async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    try {
      if (!reducedMotion) {
        await veil();
      }
      await applyAmbient(!reducedMotion);
      if (!reducedMotion) {
        await unveil();
      }
    } finally {
      busyRef.current = false;
    }
  }, [applyAmbient, reducedMotion, unveil, veil]);

  const togglePlayback = useCallback(async () => {
    const video = videoRef.current;
    if (!video || busyRef.current) return;
    if (video.paused) {
      try {
        await video.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
      return;
    }
    video.pause();
    setPlaying(false);
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video || busyRef.current) return;
    const next = !video.muted;
    video.muted = next;
    video.defaultMuted = next;
    setMuted(next);
  }, []);

  const handleEnded = useCallback(() => {
    if (modeRef.current === "sound") {
      void returnToAmbient();
    }
  }, [returnToAmbient]);

  return (
    <figure className="mx-auto mt-12 w-full max-w-[960px] md:mt-16">
      <div className="relative overflow-hidden rounded-[var(--radius-md)] bg-black">
        <div className="aspect-video">
          <video
            ref={videoRef}
            className={cn(
              "h-full w-full object-cover transition-[filter] duration-[260ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
              reducedMotion
                ? "blur-0"
                : veiled
                  ? "blur-[4px]"
                  : "blur-0",
            )}
            width={1920}
            height={1080}
            poster="/video/founder-introduction.jpg"
            preload={reducedMotion ? "none" : "metadata"}
            muted={muted}
            playsInline
            loop={mode === "ambient"}
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            aria-label={copy.label}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={handleEnded}
          >
            <source src="/video/founder-introduction.mp4" type="video/mp4" />
          </video>
        </div>

        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-black transition-opacity duration-[260ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
            reducedMotion || !veiled ? "opacity-0" : "opacity-100",
          )}
          aria-hidden
        />

        <button
          type="button"
          className="absolute inset-0 z-10 md:hidden"
          aria-label={copy.play}
          onClick={() => {
            if (busyRef.current) return;
            if (mode === "sound" && playing) {
              const video = videoRef.current;
              video?.pause();
              setPlaying(false);
            }
            setShowMobilePlay(true);
          }}
        />

        {showMobilePlay ? (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center md:hidden">
            <button
              type="button"
              className="pointer-events-auto flex h-20 w-20 items-center justify-center rounded-full bg-black/70 text-white-warm"
              aria-label={copy.play}
              onClick={() => {
                if (mode === "sound") {
                  void togglePlayback();
                  setShowMobilePlay(false);
                  return;
                }
                void playWithSound();
              }}
            >
              <PlayIcon className="h-9 w-9 translate-x-0.5" />
            </button>
          </div>
        ) : null}

        {mode !== "sound" ? (
          <div className="absolute bottom-5 left-5 hidden md:block">
            <ControlButton
              label={copy.playWithSound}
              onClick={() => void playWithSound()}
            >
              <PlayIcon />
              <span>{copy.playWithSound}</span>
            </ControlButton>
          </div>
        ) : (
          <div className="absolute bottom-5 left-5 hidden items-center gap-3 md:flex">
            <ControlButton
              label={playing ? copy.pause : copy.play}
              onClick={() => void togglePlayback()}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
              <span>{playing ? copy.pause : copy.play}</span>
            </ControlButton>
            <ControlButton
              label={muted ? copy.unmute : copy.mute}
              onClick={toggleMute}
            >
              {muted ? <MutedIcon /> : <SoundIcon />}
              <span>{muted ? copy.unmute : copy.mute}</span>
            </ControlButton>
          </div>
        )}
      </div>
      <figcaption className="eyebrow mt-4 text-charcoal">{copy.label}</figcaption>
    </figure>
  );
}

function PlayIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden>
      <path fill="currentColor" d="M5 3.5v13l12-6.5L5 3.5Z" />
    </svg>
  );
}

function PauseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden>
      <path fill="currentColor" d="M4.5 3.5h4v13h-4v-13Zm7 0h4v13h-4v-13Z" />
    </svg>
  );
}

function SoundIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden>
      <path
        fill="currentColor"
        d="M2.5 7.5h3.2L10 4.5v11L5.7 12.5H2.5v-5Zm10.1-2.2a5 5 0 0 1 0 9.4l-1.2-1.4a3.3 3.3 0 0 0 0-6.6l1.2-1.4Zm2.1-2.6a8.1 8.1 0 0 1 0 13.6l-1.2-1.4a6.5 6.5 0 0 0 0-10.8l1.2-1.4Z"
      />
    </svg>
  );
}

function MutedIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden>
      <path
        fill="currentColor"
        d="M2.5 7.5h3.2L10 4.5v11L5.7 12.5H2.5v-5Zm10.8.2 1.8-1.8 1.1 1.1-1.8 1.8 1.8 1.8-1.1 1.1-1.8-1.8-1.8 1.8-1.1-1.1 1.8-1.8-1.8-1.8 1.1-1.1 1.8 1.8Z"
      />
    </svg>
  );
}
