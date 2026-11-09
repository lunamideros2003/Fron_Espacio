import test from "node:test";
import assert from "node:assert/strict";
import { COMPACT_STARS, HOME_STARS } from "../src/constellation/stars.js";
import { COMPACT_LINES, HOME_LINES } from "../src/constellation/lines.js";
import { COMPACT_VIEW, HOME_VIEW } from "../src/constellation/viewBox.js";

function assertMenu(stars, lines, view) {
  const ids = new Set(stars.map((star) => star.id));
  assert.equal(ids.size, stars.length);
  assert.equal(ids.size, 7);
  for (const star of stars) {
    assert.ok(star.label);
    assert.ok(star.to.startsWith("/"));
    assert.ok(star.x >= 0 && star.x <= view.w);
    assert.ok(star.y >= 0 && star.y <= view.h);
  }
  for (const [from, to] of lines) {
    assert.ok(ids.has(from), `missing ${from}`);
    assert.ok(ids.has(to), `missing ${to}`);
  }
}

test("home constellation is complete", () => {
  assertMenu(HOME_STARS, HOME_LINES, HOME_VIEW);
});

test("compact constellation is complete", () => {
  assertMenu(COMPACT_STARS, COMPACT_LINES, COMPACT_VIEW);
});

test("ISS is not part of the menu anymore", () => {
  const routes = [...HOME_STARS, ...COMPACT_STARS].map((star) => star.to);
  assert.ok(!routes.includes("/iss"));
});

test("the account star is the only dynamic label", () => {
  const dynamic = HOME_STARS.filter((star) => star.id === "cuenta");
  assert.equal(dynamic.length, 1);
  assert.equal(dynamic[0].label, "Entrar");
});
