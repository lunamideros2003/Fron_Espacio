import test from "node:test";
import assert from "node:assert/strict";
import { COMPACT_LINES, HOME_LINES } from "../src/constellation/lines.js";

function assertLines(lines) {
  const keys = lines.map(([from, to]) => `${from}-${to}`);
  assert.equal(new Set(keys).size, keys.length);
  for (const [from, to] of lines) {
    assert.notEqual(from, to);
  }
}

test("home lines have no duplicates or self loops", () => {
  assertLines(HOME_LINES);
});

test("compact lines have no duplicates or self loops", () => {
  assertLines(COMPACT_LINES);
});

test("the compact menu is a single chain", () => {
  assert.equal(COMPACT_LINES.length, 6);
});
