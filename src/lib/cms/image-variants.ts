import {
  DEFAULT_COVER_WIDTH,
  INSIGHT_COVER_WIDTHS,
  type InsightCoverWidth,
} from "./config";

export function pickCoverWidth(requested: number | null | undefined): InsightCoverWidth {
  if (!requested || !Number.isFinite(requested)) return DEFAULT_COVER_WIDTH;
  for (const width of INSIGHT_COVER_WIDTHS) {
    if (requested <= width) return width;
  }
  return INSIGHT_COVER_WIDTHS[INSIGHT_COVER_WIDTHS.length - 1];
}
