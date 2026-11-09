import test from "node:test";
import assert from "node:assert/strict";
import { COMPACT_STARS, HOME_STARS } from "../src/constellation/stars.js";

test("both menus expose the same routes", () => {
  const home = HOME_STARS.map((star) => star.to).sort();
  const compact = COMPACT_STARS.map((star) => star.to).sort();
  assert.deepEqual(compact, home);
});

test("no route is repeated", () => {
  const routes = HOME_STARS.map((star) => star.to);
  assert.equal(new Set(routes).size, routes.length);
});

test("no label is repeated", () => {
  const labels = HOME_STARS.map((star) => star.label);
  assert.equal(new Set(labels).size, labels.length);
});

test("every star has a side for its label", () => {
  for (const star of [...HOME_STARS, ...COMPACT_STARS]) {
    assert.ok(["left", "right", "up", "down"].includes(star.side));
  }
});
