import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

const levels = [
  { id: "beginner", label: "Principiante" },
  { id: "intermediate", label: "Intermedio" },
  { id: "advanced", label: "Avanzado" },
];

export default function Objeto() {
  const { slug } = useParams();
  const { user } = useAuth();
  const [level, setLevel] = useState(user?.level || "beginner");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");

  useEffect(() => {
    setError("");
    api
      .object(slug, level)
      .then(setData)
      .catch((e) => setError(e.message));
  }, [slug, level]);

  async function saveObs() {
    try {
      await api.logObservation({ objectSlug: slug, notes: "Marcado desde el catálogo", visible: true });
      setSaved("Observación guardada en tu bitácora.");
    } catch (e) {
      setSaved(e.message);
    }
  }

  if (error) return <p className="glass card">{error}</p>;
  if (!data) return <p className="muted">Consultando el objeto…</p>;
  const o = data.object;

  return (
    <article className="stack">
      <div className="detail glass">
        <div>
          <p className="eyebrow">{o.type}</p>
          <h1>{o.name}</h1>
          <p className="lead">{o.funFact}</p>
          <dl className="meta">
            {o.constellation && (
              <>
                <dt>Constelación</dt>
                <dd>{o.constellation}</dd>
              </>
            )}
            {o.distance && (
              <>
                <dt>Distancia</dt>
                <dd>{o.distance}</dd>
              </>
            )}
            {o.diameter && (
              <>
                <dt>Tamaño</dt>
                <dd>{o.diameter}</dd>
              </>
            )}
            {o.magnitude != null && (
              <>
                <dt>Magnitud</dt>
                <dd>{o.magnitude}</dd>
              </>
            )}
            <dt>Mejor momento</dt>
            <dd>{o.bestMonths}</dd>
          </dl>
        </div>
        {data.imageUrl && <img src={data.imageUrl} alt={o.name} />}
      </div>

      <section className="glass card">
        <div className="chips">
          {levels.map((l) => (
            <button key={l.id} className={level === l.id ? "chip on" : "chip"} onClick={() => setLevel(l.id)}>
              {l.label}
            </button>
          ))}
        </div>
        <h2>Explicación adaptada</h2>
        <p className="explain">{data.explanation}</p>
        {user ? (
          <button className="btn" onClick={saveObs}>
            Guardar en mi bitácora
          </button>
        ) : (
          <p className="muted">Entra a tu cuenta para guardar observaciones.</p>
        )}
        {saved && <p className="muted">{saved}</p>}
      </section>
    </article>
  );
}
