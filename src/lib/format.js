export function clamp(value, min, max) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function parseUtc(iso) {
  if (!iso) return null;
  const hasZone = /Z$|[+-]\d{2}:\d{2}$/.test(iso);
  const date = new Date(hasZone ? iso : `${iso}Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDegrees(value, decimals = 1) {
  if (!Number.isFinite(value)) return "—";
  return `${value.toFixed(decimals)}°`;
}

export function formatTime(iso) {
  const date = parseUtc(iso);
  if (!date) return "—";
  return date.toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" });
}

export function formatLocalTime(iso) {
  if (!iso) return "—";
  const match = /T(\d{2}:\d{2})/.exec(iso);
  return match ? match[1] : "—";
}

export function formatDateTime(iso) {
  const date = parseUtc(iso);
  if (!date) return "—";
  return date.toLocaleString("es", { dateStyle: "short", timeStyle: "short" });
}

export function formatCount(value) {
  if (!Number.isFinite(value)) return "0";
  return new Intl.NumberFormat("es").format(value);
}
