import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { pathForCtaService, serviceSlugForCta } from "./cta";
import {
  isFeaturedValue,
  normalizeCtaService,
  normalizeLanguage,
  normalizeStatus,
  parseCmsDate,
  parseCmsRow,
} from "./schema";

describe("CMS row validation", () => {
  it("accepts a published row", () => {
    const result = parseCmsRow(
      {
        status: "Published",
        language: "en",
        translation_group: "market-entry-europe-001",
        title: "How Chinese Industrial Companies Can Enter the European Market",
        slug: "chinese-industrial-companies-enter-europe",
        seo_title: "Enter Europe",
        seo_description: "A practical guide.",
        category: "Market Entry",
        author: "OPOPA",
        published_at: "2026-09-01",
        updated_at: "2026-09-02",
        target_keyword: "european market entry",
        doc_url: "https://docs.google.com/document/d/abcDEF12345/edit",
        cover_image_url: "https://drive.google.com/file/d/abcDEF12345/view",
        cta_service: "Market Entry",
        featured: "TRUE",
      },
      2,
    );
    assert.equal(result.ok, true);
  });

  it("rejects a missing slug", () => {
    const result = parseCmsRow(
      {
        status: "Published",
        language: "en",
        translation_group: "x",
        title: "Title",
        slug: "",
        seo_title: "",
        seo_description: "",
        category: "",
        author: "",
        published_at: "",
        updated_at: "",
        target_keyword: "",
        doc_url: "",
        cover_image_url: "",
        cta_service: "",
        featured: "",
      },
      3,
    );
    assert.equal(result.ok, false);
  });
});

describe("normalizers", () => {
  it("maps language and status", () => {
    assert.equal(normalizeLanguage("zh-CN"), "zh-CN");
    assert.equal(normalizeLanguage("zh"), "zh-CN");
    assert.equal(normalizeLanguage("en"), "en");
    assert.equal(normalizeStatus("published"), "Published");
    assert.equal(normalizeStatus("Draft"), "Draft");
    assert.equal(isFeaturedValue("TRUE"), true);
    assert.equal(isFeaturedValue("no"), false);
    assert.equal(parseCmsDate("2026-09-13"), "2026-09-13");
    assert.equal(normalizeCtaService("AI Sales Automation"), "AI Sales Automation");
  });

  it("maps CTAs to real service routes", () => {
    assert.equal(
      pathForCtaService("Market Entry"),
      "/services/european-market-entry",
    );
    assert.equal(
      pathForCtaService("Sales Outsourcing"),
      "/services/european-sales-representation",
    );
    assert.equal(
      pathForCtaService("Sales Coaching"),
      "/services/european-sales-representation",
    );
    assert.equal(
      pathForCtaService("AI Sales Automation"),
      "/services/sales-ai-automation",
    );
    assert.equal(pathForCtaService("None"), null);
    assert.equal(
      serviceSlugForCta("Sales Coaching"),
      "european-sales-representation",
    );
    assert.equal(serviceSlugForCta("Market Entry"), "european-market-entry");
  });
});
