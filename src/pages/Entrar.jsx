import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

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

  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      const d = mode === "login" ? await api.login(form) : await api.register(form);
      login(d);
      nav("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="glass card auth" onSubmit={submit}>
      <p className="eyebrow">Cuenta</p>
      <h1>{mode === "login" ? "Entrar a AstroIA" : "Crear explorador"}</h1>
      {mode === "register" && (
        <>
          <label>
            Nombre
            <input value={form.name} onChange={(e) => set("name", e.target.value)} required />
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
        <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required />
      </label>
      <label>
        Contraseña
        <input type="password" value={form.password} onChange={(e) => set("password", e.target.value)} required />
      </label>
      {error && <p className="bad">{error}</p>}
      <button className="btn">{mode === "login" ? "Entrar" : "Registrarme"}</button>
      <button
        type="button"
        className="ghost"
        onClick={() => setMode(mode === "login" ? "register" : "login")}
      >
        {mode === "login" ? "¿No tienes cuenta? Regístrate" : "Ya tengo cuenta"}
      </button>
      <p className="muted">Demo: luna@astroia.dev / astroia123</p>
    </form>
  );
}
