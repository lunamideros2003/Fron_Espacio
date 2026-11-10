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

export function isName(value) {
  return String(value || "").trim().length >= 2;
}

export const MESSAGES = {
  email: "Escribe un correo válido con @ y dominio, por ejemplo nombre@correo.com",
  password: "La contraseña debe tener al menos 8 caracteres",
  passwordRequired: "Escribe tu contraseña",
  name: "Escribe tu nombre (al menos 2 letras)",
};

export function validateForm(mode, form) {
  const errors = {};
  if (mode === "register" && !isName(form.name)) {
    errors.name = MESSAGES.name;
  }
  if (!isEmail(form.email)) {
    errors.email = MESSAGES.email;
  }
  if (mode === "register" && !isPassword(form.password)) {
    errors.password = MESSAGES.password;
  }
  if (mode === "login" && !String(form.password || "").trim()) {
    errors.password = MESSAGES.passwordRequired;
  }
  return errors;
}

export function fieldError(field, mode, form) {
  return validateForm(mode, form)[field] || "";
}
