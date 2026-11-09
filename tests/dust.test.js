import test from "node:test";
import assert from "node:assert/strict";
import { skyDust } from "../src/constellation/dust.js";
import { COMPACT_VIEW, HOME_VIEW } from "../src/constellation/viewBox.js";

test("dust is deterministic for the same seed", () => {
  assert.deepEqual(skyDust(10, 42), skyDust(10, 42));
});

test("dust changes with the seed", () => {
  assert.notDeepEqual(skyDust(10, 42), skyDust(10, 43));
});

test("dust stays inside the requested viewBox", () => {
  for (const dot of skyDust(50, 7, COMPACT_VIEW)) {
    assert.ok(dot.x >= 0 && dot.x <= COMPACT_VIEW.w);
    assert.ok(dot.y >= 0 && dot.y <= COMPACT_VIEW.h);
    assert.ok(dot.r > 0);
    assert.ok(dot.o > 0 && dot.o <= 1);
  }
});

test("dust uses the home viewBox by default", () => {
  const dots = skyDust(20);
  assert.ok(dots.some((dot) => dot.x > COMPACT_VIEW.w || dot.y > COMPACT_VIEW.h));
  assert.ok(dots.every((dot) => dot.x <= HOME_VIEW.w));
});
