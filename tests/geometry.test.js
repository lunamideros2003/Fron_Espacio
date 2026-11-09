import test from "node:test";
import assert from "node:assert/strict";
import { percentX, percentY, lineEnds } from "../src/constellation/geometry.js";
import { HOME_VIEW } from "../src/constellation/viewBox.js";

test("percentX maps the home viewBox to CSS percentages", () => {
  assert.equal(percentX(0), "0%");
  assert.equal(percentX(HOME_VIEW.w / 2), "50%");
  assert.equal(percentX(HOME_VIEW.w), "100%");
});

test("percentY uses the requested viewBox", () => {
  assert.equal(percentY(95, { w: 1000, h: 190 }), "50%");
});

test("lineEnds joins two known stars", () => {
  const stars = [
    { id: "a", x: 1, y: 2 },
    { id: "b", x: 3, y: 4 },
  ];
  assert.deepEqual(lineEnds(stars, ["a", "b"]), {
    key: "a-b",
    x1: 1,
    y1: 2,
    x2: 3,
    y2: 4,
  });
});

test("lineEnds returns null for missing stars", () => {
  assert.equal(lineEnds([], ["a", "b"]), null);
});
