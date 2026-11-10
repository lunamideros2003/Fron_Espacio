const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

export function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

export function isEmail(value) {
  return EMAIL_PATTERN.test(normalizeEmail(value));
}

export function isPassword(value) {
  return String(value || "").trim().length >= 8;
}
