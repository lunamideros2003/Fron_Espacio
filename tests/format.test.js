import test from "node:test";
import assert from "node:assert/strict";
import { clamp, formatCount, formatDateTime, formatDegrees, formatLocalTime, formatTime, parseUtc } from "../src/lib/format.js";

test("clamp keeps values inside the range", () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(-1, 0, 10), 0);
  assert.equal(clamp(11, 0, 10), 10);
  assert.equal(clamp(Number.NaN, 0, 10), 0);
});

test("parseUtc treats zone-less timestamps as UTC", () => {
  assert.equal(parseUtc("2024-01-01T00:00:00").toISOString(), "2024-01-01T00:00:00.000Z");
  assert.equal(parseUtc("2024-01-01T00:00:00Z").toISOString(), "2024-01-01T00:00:00.000Z");
});

test("parseUtc keeps the instant when an offset is present", () => {
  assert.equal(parseUtc("2024-01-01T00:00:00-05:00").toISOString(), "2024-01-01T05:00:00.000Z");
});

test("parseUtc rejects empty and invalid values", () => {
  assert.equal(parseUtc(""), null);
  assert.equal(parseUtc("nope"), null);
});

test("formatDegrees keeps one decimal by default", () => {
  assert.equal(formatDegrees(4.711), "4.7°");
  assert.equal(formatDegrees(4.711, 2), "4.71°");
  assert.equal(formatDegrees(Number.NaN), "—");
});

test("time and date helpers never crash", () => {
  assert.ok(formatTime("2024-01-01T00:00:00"));
  assert.ok(formatDateTime("2024-01-01T00:00:00"));
  assert.equal(formatTime(""), "—");
  assert.equal(formatDateTime("nope"), "—");
});

test("formatLocalTime keeps the clock from a local timestamp", () => {
  assert.equal(formatLocalTime("2026-11-08T17:55"), "17:55");
  assert.equal(formatLocalTime("2026-11-08T05:51:00"), "05:51");
  assert.equal(formatLocalTime(null), "—");
});

test("formatCount returns a string", () => {
  assert.equal(typeof formatCount(1234), "string");
  assert.equal(formatCount(Number.NaN), "0");
});
