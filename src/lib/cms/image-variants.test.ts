import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { pickCoverWidth } from "./image-variants";

describe("pickCoverWidth", () => {
  it("maps requested widths to cached variants", () => {
    assert.equal(pickCoverWidth(320), 640);
    assert.equal(pickCoverWidth(640), 640);
    assert.equal(pickCoverWidth(700), 960);
    assert.equal(pickCoverWidth(1200), 1600);
    assert.equal(pickCoverWidth(2400), 1600);
    assert.equal(pickCoverWidth(null), 1600);
  });
});
