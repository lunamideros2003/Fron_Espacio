import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";

export default function Clasificar() {
  const [form, setForm] = useState({ brightness: 3, color: "white", moving: "no", shape: "point" });
  const [result, setResult] = useState(null);

  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e) {
    e.preventDefault();
    const d = await api.classify({ ...form, brightness: Number(form.brightness) });
    setResult(d);
  }

  return (
    <div className="stack">
      <section className="glass head">
        <div>
          <p className="eyebrow">Clasificación de objetos celestes</p>
          <h1>¿Qué estoy viendo?</h1>
          <p className="muted">Describe la luz y AstroIA estima si es planeta, estrella, galaxia, satélite o avión.</p>
        </div>
      </section>
      <form className="glass card form-grid" onSubmit={submit}>
        <label>
          Brillo (1 débil · 5 muy brillante)
          <input type="range" min="1" max="5" value={form.brightness} onChange={(e) => set("brightness", e.target.value)} />
        </label>
        <label>
          Color
          <select value={form.color} onChange={(e) => set("color", e.target.value)}>
            <option value="white">Blanco</option>
            <option value="yellow">Amarillo / crema</option>
            <option value="red">Rojizo</option>
            <option value="blue">Azulado</option>
          </select>
        </label>
        <label>
          ¿Se mueve a simple vista?
          <select value={form.moving} onChange={(e) => set("moving", e.target.value)}>
            <option value="no">No, está fija</option>
            <option value="yes">Sí, se desplaza</option>
          </select>
        </label>
        <label>
          Forma
          <select value={form.shape} onChange={(e) => set("shape", e.target.value)}>
            <option value="point">Punto</option>
            <option value="disk">Disco</option>
            <option value="extended">Mancha / extendida</option>
          </select>
        </label>
        <button className="btn">Clasificar</button>
      </form>
      {result && (
        <section className="glass card">
          <h2>{result.title}</h2>
          <p>Confianza aproximada: {Math.round(result.confidence * 100)}%</p>
          <ul>
            {result.reasons.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
          {result.similar?.length > 0 && (
            <p>
              Relacionados:{" "}
              {result.similar.map((s) => (
                <Link key={s.slug} to={`/objeto/${s.slug}`} className="inline-link">
                  {s.name}{" "}
                </Link>
              ))}
            </p>
          )}
        </section>
      )}
    </div>
  );
}
