export const INSIGHT_COVER_WIDTHS = [640, 960, 1600] as const;
export type InsightCoverWidth = (typeof INSIGHT_COVER_WIDTHS)[number];
export const DEFAULT_COVER_WIDTH = 1600;

export function pickCoverWidth(requested: number | null | undefined): InsightCoverWidth {
  if (!requested || !Number.isFinite(requested)) return DEFAULT_COVER_WIDTH;
  for (const width of INSIGHT_COVER_WIDTHS) {
    if (requested <= width) return width;
  }
  return INSIGHT_COVER_WIDTHS[INSIGHT_COVER_WIDTHS.length - 1];
}

export function isInsightCoverSrc(src: string) {
  return src.startsWith("/media/insights/");
}

export function insightCoverUrl(
  src: string,
  width: InsightCoverWidth,
  format: "webp" | "jpeg" = "webp",
) {
  const params = new URLSearchParams({
    w: String(width),
    fm: format,
  });
  return `${src}?${params.toString()}`;
}
