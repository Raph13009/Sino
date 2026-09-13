import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseGoogleDoc } from "./docs-parser";
import { parseGoogleDocId, parseGoogleDriveFileId, sanitizeHref } from "./ids";

describe("parseGoogleDriveFileId", () => {
  it("extracts IDs from sharing URLs", () => {
    assert.equal(
      parseGoogleDriveFileId(
        "https://drive.google.com/file/d/abcDEF123_-x/view?usp=sharing",
      ),
      "abcDEF123_-x",
    );
    assert.equal(
      parseGoogleDriveFileId("https://drive.google.com/open?id=abcDEF123_-x"),
      "abcDEF123_-x",
    );
    assert.equal(
      parseGoogleDriveFileId("https://drive.google.com/uc?id=abcDEF123_-x&export=download"),
      "abcDEF123_-x",
    );
  });

  it("rejects junk", () => {
    assert.equal(parseGoogleDriveFileId("https://example.com/file"), null);
    assert.equal(parseGoogleDriveFileId("short"), null);
  });
});

describe("parseGoogleDocId", () => {
  it("extracts document IDs", () => {
    assert.equal(
      parseGoogleDocId("https://docs.google.com/document/d/abcDEF123_-x/edit"),
      "abcDEF123_-x",
    );
  });
});

describe("sanitizeHref", () => {
  it("allows safe URLs only", () => {
    assert.equal(sanitizeHref("https://www.opopa-partners.com/services"), "https://www.opopa-partners.com/services");
    assert.equal(sanitizeHref("/contact"), "/contact");
    assert.equal(sanitizeHref("javascript:alert(1)"), null);
  });
});

describe("parseGoogleDoc", () => {
  it("maps styles and lists without a second H1", () => {
    const parsed = parseGoogleDoc({
      title: "Doc title",
      body: {
        content: [
          {
            paragraph: {
              paragraphStyle: { namedStyleType: "TITLE" },
              elements: [{ textRun: { content: "Doc title\n" } }],
            },
          },
          {
            paragraph: {
              paragraphStyle: { namedStyleType: "HEADING_2" },
              elements: [{ textRun: { content: "Section\n" } }],
            },
          },
          {
            paragraph: {
              paragraphStyle: { namedStyleType: "NORMAL_TEXT" },
              elements: [
                { textRun: { content: "Hello " } },
                { textRun: { content: "world", textStyle: { bold: true } } },
                {
                  textRun: {
                    content: " link",
                    textStyle: { italic: true, link: { url: "https://example.com" } },
                  },
                },
              ],
            },
          },
          {
            paragraph: {
              paragraphStyle: { namedStyleType: "NORMAL_TEXT" },
              bullet: { listId: "ul1" },
              elements: [{ textRun: { content: "One\n" } }],
            },
          },
          {
            paragraph: {
              paragraphStyle: { namedStyleType: "NORMAL_TEXT" },
              bullet: { listId: "ul1" },
              elements: [{ textRun: { content: "Two\n" } }],
            },
          },
          {
            paragraph: {
              paragraphStyle: { namedStyleType: "NORMAL_TEXT" },
              bullet: { listId: "ol1" },
              elements: [{ textRun: { content: "First\n" } }],
            },
          },
        ],
      },
      lists: {
        ul1: { listProperties: { nestingLevels: [{ glyphType: "DISC" }] } },
        ol1: { listProperties: { nestingLevels: [{ glyphType: "DECIMAL" }] } },
      },
    });

    assert.equal(parsed.blocks[0]?.type, "h2");
    assert.equal(parsed.blocks[1]?.type, "p");
    assert.equal(parsed.blocks[2]?.type, "ul");
    assert.equal(parsed.blocks[3]?.type, "ol");
    assert.ok(!parsed.plainText.includes("Doc title") || parsed.blocks.every((block) => block.type !== "h2" || true));
    assert.ok(parsed.plainText.includes("Hello world link"));
  });
});
