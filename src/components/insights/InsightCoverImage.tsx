"use client";

import { useState } from "react";
import { insightCoverUrl } from "@/lib/cms/image-variants";
import { cn } from "@/lib/utils";

type InsightCoverImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function InsightCoverImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: InsightCoverImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn("flex h-full w-full items-end bg-ink", className)}
        role="img"
        aria-label={alt}
      >
        <p className="p-6 text-sm uppercase tracking-[0.08em] text-white-warm">
          {alt}
        </p>
      </div>
    );
  }

  return (
    // Native img: next/image custom loaders cannot be passed from Server Components.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={insightCoverUrl(src, 960)}
      srcSet={`${insightCoverUrl(src, 640)} 640w, ${insightCoverUrl(src, 960)} 960w, ${insightCoverUrl(src, 1600)} 1600w`}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={cn("h-full w-full object-cover", className)}
      onError={() => setFailed(true)}
    />
  );
}
