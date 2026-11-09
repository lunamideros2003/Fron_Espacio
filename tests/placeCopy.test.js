import test from "node:test";
import assert from "node:assert/strict";
import { placeMessage } from "../src/constellation/placeCopy.js";

test("every known source has a Spanish message", () => {
  for (const source of ["browser", "profile", "search", "ip"]) {
    assert.match(placeMessage(source), /[a-záéíóúñ]/i);
  }
});

test("unknown sources fall back to the example sky message", () => {
  assert.equal(placeMessage("unknown"), placeMessage("fallback"));
});
