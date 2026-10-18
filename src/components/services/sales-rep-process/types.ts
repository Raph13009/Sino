import type { Dictionary } from "@/content/locales/types";

export type SalesRepProcessContent =
  Dictionary["services"]["european-sales-representation"]["process"];

export type SalesRepProcessStep = SalesRepProcessContent["steps"][number];

export type SalesRepProcessVisuals = SalesRepProcessContent["visuals"];
