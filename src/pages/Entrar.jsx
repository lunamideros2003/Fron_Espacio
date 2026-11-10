import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { fieldError, validateForm } from "../lib/validate.js";

export default function Entrar() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "luna@astroia.dev",
    password: "astroia123",
    level: "beginner",
  });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
    setFieldErrors((errors) => {
      if (!errors[k]) return errors;
      const next = { ...errors };
      delete next[k];
      return next;
    });
    if (error) setError("");
  }

  function switchMode() {
    setMode(mode === "login" ? "register" : "login");
    setFieldErrors({});
    setError("");
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    const errors = validateForm(mode, form);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    try {
      const d = mode === "login" ? await api.login(form) : await api.register(form);
      login(d);
      nav("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="glass card auth" onSubmit={submit} noValidate>
      <p className="eyebrow">Cuenta</p>
      <h1>{mode === "login" ? "Entrar a AstroIA" : "Crear explorador"}</h1>
      {mode === "register" && (
        <>
          <label>
            Nombre
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              onBlur={() => {
                if (!form.name.trim()) return;
                setFieldErrors((errors) => ({ ...errors, name: fieldError("name", mode, form) }));
              }}
              required
              autoComplete="name"
              aria-invalid={fieldErrors.name ? "true" : undefined}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
            />
            {fieldErrors.name && (
              <span className="field-error" id="name-error" role="alert">
                {fieldErrors.name}
              </span>
            )}
          </label>
          <label>
            Nivel
            <select value={form.level} onChange={(e) => set("level", e.target.value)}>
              <option value="beginner">Principiante</option>
              <option value="intermediate">Intermedio</option>
              <option value="advanced">Avanzado</option>
            </select>
          </label>
        </>
      )}
      <label>
        Correo
        <input
          type="email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          onBlur={() => {
            if (!form.email.trim()) return;
            setFieldErrors((errors) => ({ ...errors, email: fieldError("email", mode, form) }));
          }}
          required
          autoComplete="email"
          inputMode="email"
          spellCheck={false}
          aria-invalid={fieldErrors.email ? "true" : undefined}
          aria-describedby={fieldErrors.email ? "email-error" : undefined}
        />
        {fieldErrors.email && (
          <span className="field-error" id="email-error" role="alert">
            {fieldErrors.email}
          </span>
        )}
      </label>
      <label>
        Contraseña
        <input
          type="password"
          value={form.password}
          onChange={(e) => set("password", e.target.value)}
          onBlur={() => {
            if (!form.password.trim()) return;
            setFieldErrors((errors) => ({ ...errors, password: fieldError("password", mode, form) }));
          }}
          required
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          aria-invalid={fieldErrors.password ? "true" : undefined}
          aria-describedby={fieldErrors.password ? "password-error" : undefined}
        />
        {fieldErrors.password && (
          <span className="field-error" id="password-error" role="alert">
            {fieldErrors.password}
          </span>
        )}
      </label>
      {(error || Object.keys(fieldErrors).length > 0) && (
        <p className="bad" role="alert">
          {error || "Revisa los campos marcados."}
        </p>
      )}
      <button className="btn">{mode === "login" ? "Entrar" : "Registrarme"}</button>
      <button
        type="button"
        className="ghost"
        onClick={switchMode}
      >
        {mode === "login" ? "¿No tienes cuenta? Regístrate" : "Ya tengo cuenta"}
      </button>
      <p className="muted">Demo: luna@astroia.dev / astroia123</p>
    </form>
  );
}
