import test from "node:test";
import assert from "node:assert/strict";

class MemoryStorage {
  constructor() {
    this.map = new Map();
  }
  getItem(key) {
    return this.map.has(key) ? this.map.get(key) : null;
  }
  setItem(key, value) {
    this.map.set(key, String(value));
  }
  removeItem(key) {
    this.map.delete(key);
  }
}

const { PLACE_KEY, PLACE_TTL_MS, clearSavedPlace, isPlace, readSavedPlace, savePlace } = await import(
  "../src/lib/placeStore.js"
);

const place = { latitude: 4.711, longitude: -74.0721, label: "Bogotá, Colombia", source: "search" };

test.beforeEach(() => {
  globalThis.localStorage = new MemoryStorage();
});

test("valid places are accepted", () => {
  assert.equal(isPlace(place), true);
});

test("invalid places are rejected", () => {
  assert.equal(isPlace(null), false);
  assert.equal(isPlace({ ...place, latitude: 100 }), false);
  assert.equal(isPlace({ ...place, longitude: Number.NaN }), false);
  assert.equal(isPlace({ ...place, label: "  " }), false);
});

test("save and read roundtrip", () => {
  const now = 1_000;
  assert.equal(savePlace(place, now), true);
  assert.deepEqual(readSavedPlace(now + 10), place);
});

test("expired places are removed", () => {
  const now = 1_000;
  savePlace(place, now);
  assert.equal(readSavedPlace(now + PLACE_TTL_MS + 1), null);
  assert.equal(globalThis.localStorage.getItem(PLACE_KEY), null);
});

test("corrupt storage is ignored", () => {
  globalThis.localStorage.setItem(PLACE_KEY, "{nope");
  assert.equal(readSavedPlace(), null);
});

test("places stay valid until the ttl boundary", () => {
  const now = 1_000;
  savePlace(place, now);
  assert.deepEqual(readSavedPlace(now + PLACE_TTL_MS), place);
  assert.deepEqual(readSavedPlace(now + PLACE_TTL_MS + 1), null);
});

test("invalid places are never saved", () => {
  assert.equal(savePlace({ ...place, latitude: 91 }), false);
  assert.equal(readSavedPlace(), null);
});

test("clear removes the saved place", () => {
  savePlace(place);
  clearSavedPlace();
  assert.equal(readSavedPlace(), null);
});
