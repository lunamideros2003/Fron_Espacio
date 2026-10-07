import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";

const types = [
  { id: "", label: "Todos" },
  { id: "planet", label: "Planetas" },
  { id: "star", label: "Estrellas" },
  { id: "galaxy", label: "Galaxias" },
  { id: "moon", label: "Lunas" },
  { id: "phenomenon", label: "Fenómenos" },
];

const typeLabel = {
  planet: "Planeta",
  star: "Estrella",
  galaxy: "Galaxia",
  moon: "Luna",
  phenomenon: "Fenómeno",
};

export default function Explorar() {
  const [type, setType] = useState("");
  const [q, setQ] = useState("");
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (q) params.set("q", q);
    const s = params.toString();
    setLoading(true);
    api
      .objects(s ? `?${s}` : "")
      .then((d) => setObjects(d.objects))
      .finally(() => setLoading(false));
  }, [type, q]);

  return (
    <div className="stack">
      <header className="glass head">
        <div>
          <p className="eyebrow">Catálogo</p>
          <h1>Elige un objeto celeste</h1>
          <p className="muted">La IA del proyecto te lo explicará según tu nivel de aprendizaje.</p>
        </div>
        <input
          className="search"
          placeholder="Buscar: Marte, aurora, Andrómeda…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </header>
      <div className="chips">
        {types.map((t) => (
          <button key={t.id} className={type === t.id ? "chip on" : "chip"} onClick={() => setType(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      {loading ? (
        <p className="muted">Cargando el universo…</p>
      ) : (
        <div className="grid-cards">
          {objects.map((o) => (
            <Link to={`/objeto/${o.slug}`} key={o.id} className="glass card object-card">
              <span className="tag">{typeLabel[o.type] || o.type}</span>
              <h3>{o.name}</h3>
              <p>{o.funFact}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
