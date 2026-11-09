import { readJson, removeKey, writeJson } from "./storage.js";

export const PLACE_KEY = "astroia_place";
export const PLACE_TTL_MS = 12 * 60 * 60 * 1000;

export function isPlace(value) {
  if (!value || typeof value !== "object") return false;
  const { latitude, longitude, label, source } = value;
  return (
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180 &&
    typeof label === "string" &&
    label.trim().length > 0 &&
    typeof source === "string"
  );
}

export function readSavedPlace(now = Date.now()) {
  const saved = readJson(PLACE_KEY, null);
  if (!saved) return null;
  if (!isPlace(saved.place) || !Number.isFinite(saved.savedAt)) {
    removeKey(PLACE_KEY);
    return null;
  }
  if (now - saved.savedAt > PLACE_TTL_MS) {
    removeKey(PLACE_KEY);
    return null;
  }
  return saved.place;
}

export function savePlace(place, now = Date.now()) {
  if (!isPlace(place)) return false;
  return writeJson(PLACE_KEY, { place, savedAt: now });
}

export function clearSavedPlace() {
  removeKey(PLACE_KEY);
}
