import type { ImageLoaderProps } from "next/image";
import { pickCoverWidth } from "@/lib/cms/image-variants";

export function isInsightCoverSrc(src: string) {
  return src.startsWith("/media/insights/");
}

/** Bypass /_next/image so Drive originals are not re-fetched per optimizer width. */
export function insightCoverLoader({ src, width }: ImageLoaderProps) {
  const variant = pickCoverWidth(width);
  return `${src}?w=${variant}&fm=webp`;
}
