/**
 * Playwright verification for the ESR pinned process section.
 * npx --yes playwright@1.50.0 install chromium
 * node scripts/verify-sales-process.mjs
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = "tmp/process-verify";
mkdirSync(OUT, { recursive: true });

async function scrollToStep(page, index) {
  await page.evaluate((i) => {
    const el = document.querySelector("#how-it-works .h-\\[400vh\\]");
    if (!el) throw new Error("pin track missing");
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = Math.max(el.offsetHeight - window.innerHeight, 1);
    window.scrollTo({ top: top + ((i + 0.4) / 5) * range, behavior: "instant" });
  }, index);
  await page.waitForTimeout(800);
}

async function verifyLocale(page, locale) {
  const path =
    locale === "zh"
      ? "/zh/services/european-sales-representation"
      : "/services/european-sales-representation";
  await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#how-it-works .h-\\[400vh\\]");

  const results = [];
  for (let i = 0; i < 5; i++) {
    await scrollToStep(page, i);
    const h3 = await page.locator("#how-it-works h3").innerText();
    const counter = (
      await page
        .locator("#how-it-works p")
        .filter({ hasText: /\d{2}\s*\/\s*\d{2}/ })
        .first()
        .innerText()
    ).replace(/\s+/g, " ");

    const bothVisible = await page.evaluate(() => {
      const h3El = document.querySelector("#how-it-works h3");
      const stage = document.querySelector("#how-it-works .bg-ink");
      if (!h3El || !stage) return false;
      const a = h3El.getBoundingClientRect();
      const b = stage.getBoundingClientRect();
      const vh = window.innerHeight;
      return (
        a.top > 48 &&
        a.bottom < vh - 8 &&
        b.top > 48 &&
        b.bottom < vh + 24
      );
    });

    await page.screenshot({
      path: `${OUT}/${locale}-step-${i + 1}.png`,
    });
    results.push({ step: i + 1, counter, h3, bothVisible });
  }

  await scrollToStep(page, 0);
  const reverseTitle = await page.locator("#how-it-works h3").innerText();
  return { results, reverseTitle };
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

try {
  const en = await verifyLocale(page, "en");
  const zh = await verifyLocale(page, "zh");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE}/services/european-sales-representation`, {
    waitUntil: "domcontentloaded",
  });
  await scrollToStep(page, 1);
  await page.screenshot({ path: `${OUT}/en-mobile.png` });

  console.log(JSON.stringify({ en, zh }, null, 2));
  const failed = [...en.results, ...zh.results].filter((r) => !r.bothVisible);
  if (failed.length) {
    console.error("FAILED", failed);
    process.exit(1);
  }
  console.log("OK");
} finally {
  await browser.close();
}
