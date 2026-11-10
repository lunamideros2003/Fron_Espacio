import test from "node:test";
import assert from "node:assert/strict";
import { isEmail, isName, isPassword, normalizeEmail } from "../src/lib/validate.js";

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

test("password requires eight characters", () => {
  assert.equal(isPassword("astroia123"), true);
  assert.equal(isPassword("astroia"), false);
  assert.equal(isPassword(""), false);
  assert.equal(isPassword("        "), false);
});

test("name requires two letters", () => {
  assert.equal(isName("Luna"), true);
  assert.equal(isName(" Lu "), true);
  assert.equal(isName("L"), false);
  assert.equal(isName(""), false);
});
