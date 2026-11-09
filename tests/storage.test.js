import test from "node:test";
import assert from "node:assert/strict";
import { readJson, removeKey, writeJson } from "../src/lib/storage.js";

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

test.beforeEach(() => {
  globalThis.localStorage = new MemoryStorage();
});

test("writes and reads JSON values", () => {
  assert.equal(writeJson("astroia_test", { a: 1 }), true);
  assert.deepEqual(readJson("astroia_test", null), { a: 1 });
});

test("returns the fallback for missing keys", () => {
  assert.equal(readJson("astroia_missing", "vacio"), "vacio");
});

test("returns the fallback for corrupt JSON", () => {
  globalThis.localStorage.setItem("astroia_bad", "{nope");
  assert.equal(readJson("astroia_bad", null), null);
});

test("removes keys", () => {
  globalThis.localStorage.setItem("astroia_gone", "1");
  removeKey("astroia_gone");
  assert.equal(globalThis.localStorage.getItem("astroia_gone"), null);
});

test("survives a storage that throws", () => {
  globalThis.localStorage = {
    getItem() {
      throw new Error("blocked");
    },
    setItem() {
      throw new Error("blocked");
    },
    removeItem() {
      throw new Error("blocked");
    },
  };
  assert.equal(readJson("astroia_blocked", 7), 7);
  assert.equal(writeJson("astroia_blocked", 1), false);
  assert.doesNotThrow(() => removeKey("astroia_blocked"));
});
