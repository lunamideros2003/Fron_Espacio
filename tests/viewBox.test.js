import test from "node:test";
import assert from "node:assert/strict";
import { COMPACT_VIEW, HOME_VIEW, VIEW_H, VIEW_W } from "../src/constellation/viewBox.js";

test("views keep positive dimensions", () => {
  for (const view of [HOME_VIEW, COMPACT_VIEW]) {
    assert.ok(view.w > 0);
    assert.ok(view.h > 0);
  }
});

test("the compact view is wider than tall", () => {
  assert.ok(COMPACT_VIEW.w > COMPACT_VIEW.h);
});

test("legacy exports mirror the home view", () => {
  assert.equal(VIEW_W, HOME_VIEW.w);
  assert.equal(VIEW_H, HOME_VIEW.h);
});
