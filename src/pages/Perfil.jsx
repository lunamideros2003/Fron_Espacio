import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Perfil() {
  const { user, login, ready } = useAuth();
  const [form, setForm] = useState(user || {});
  const [scores, setScores] = useState(null);
  const [obs, setObs] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (user) setForm(user);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    api.scores().then(setScores).catch(() => {});
    api.myObservations().then((d) => setObs(d.observations)).catch(() => {});
  }, [user]);

  if (!ready) return null;
  if (!user) return <Navigate to="/entrar" replace />;

  async function save(e) {
    e.preventDefault();
    const d = await api.updateMe({
      name: form.name,
      level: form.level,
      city: form.city,
      latitude: form.latitude ? Number(form.latitude) : null,
      longitude: form.longitude ? Number(form.longitude) : null,
    });
    login(d);
    setMsg("Perfil actualizado.");
  }

  return (
    <div className="stack">
      <form className="glass card form-grid" onSubmit={save}>
        <h1>Tu bitácora</h1>
        <label>
          Nombre
          <input value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </label>
        <label>
          Nivel
          <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
            <option value="beginner">Principiante</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
          </select>
        </label>
        <label>
          Ciudad
          <input value={form.city || ""} onChange={(e) => setForm({ ...form, city: e.target.value })} />
        </label>
        <label>
          Latitud
          <input value={form.latitude || ""} onChange={(e) => setForm({ ...form, latitude: e.target.value })} />
        </label>
        <label>
          Longitud
          <input value={form.longitude || ""} onChange={(e) => setForm({ ...form, longitude: e.target.value })} />
        </label>
        <button className="btn">Guardar</button>
        {msg && <p className="ok">{msg}</p>}
      </form>
      <section className="glass card">
        <h2>Puntuaciones</h2>
        {scores ? (
          <p>
            Mejor: {scores.bestPercent}% · {scores.attempts.length} intentos
          </p>
        ) : (
          <p className="muted">Aún no hay quizzes.</p>
        )}
      </section>
      <section className="glass card">
        <h2>Observaciones</h2>
        {obs.length === 0 && <p className="muted">Todavía no registras objetos.</p>}
        <ul>
          {obs.map((o) => (
            <li key={o.id}>
              {o.object.name} · {new Date(o.date).toLocaleString()} {o.notes ? `— ${o.notes}` : ""}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
