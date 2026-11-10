import test from "node:test";
import assert from "node:assert/strict";
import { isEmail, normalizeEmail } from "../src/lib/validate.js";

test("email requires at and a domain", () => {
  assert.equal(isEmail("luna@astroia.dev"), true);
  assert.equal(isEmail("luna.astroia.dev"), false);
  assert.equal(isEmail("luna@astroia"), false);
  assert.equal(isEmail("luna@astroia."), false);
  assert.equal(isEmail(""), false);
});

test("email is normalized to lowercase", () => {
  assert.equal(normalizeEmail("  Luna@AstroIA.dev "), "luna@astroia.dev");
});

test("email rejects spaces", () => {
  assert.equal(isEmail("lu na@astroia.dev"), false);
  assert.equal(isEmail("luna @astroia.dev"), false);
});
