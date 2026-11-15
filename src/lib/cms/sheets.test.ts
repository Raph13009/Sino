import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { rowsFromValues } from "./sheets";

describe("rowsFromValues", () => {
  it("maps header rows into objects", () => {
    const rows = rowsFromValues([
      ["status", "language", "title"],
      ["Published", "en", "One"],
      ["", "", ""],
      ["Draft", "zh-CN", "Two"],
    ]);
    assert.deepEqual(rows, [
      { status: "Published", language: "en", title: "One" },
      { status: "Draft", language: "zh-CN", title: "Two" },
    ]);
  });

  it("returns an empty list when only headers exist", () => {
    assert.deepEqual(rowsFromValues([["status", "slug"]]), []);
  });
});
