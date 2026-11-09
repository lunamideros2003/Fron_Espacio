function storage() {
  try {
    return globalThis.localStorage || null;
  } catch {
    return null;
  }
}

export function readJson(key, fallback = null) {
  const store = storage();
  if (!store) return fallback;
  try {
    const raw = store.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson(key, value) {
  const store = storage();
  if (!store) return false;
  try {
    store.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeKey(key) {
  const store = storage();
  if (!store) return;
  try {
    store.removeItem(key);
  } catch {
    // Storage can be disabled by the browser. Nothing to do.
  }
}
