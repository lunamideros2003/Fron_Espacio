import { useEffect, useState } from "react";
import { api } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

const CENTER = 500;
const HORIZON = 450;
const RINGS = [30, 60];
const DIRS = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];

const ringRadius = (altitude) => ((90 - altitude) / 90) * HORIZON;
const compass = (azimuth) => DIRS[Math.round(azimuth / 45) % 8];

function parseUtc(iso) {
  const hasZone = /Z$|[+-]\d{2}:\d{2}$/.test(iso);
  return new Date(hasZone ? iso : `${iso}Z`);
}

export default function Carta() {
  const { user } = useAuth();
  const [lat, setLat] = useState(user?.latitude ?? "");
  const [lng, setLng] = useState(user?.longitude ?? "");
  const [when, setWhen] = useState("");
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load(e) {
    e?.preventDefault();
    setLoading(true);
    setError("");
    try {
      const iso = when ? new Date(when).toISOString() : undefined;
      const d = await api.skyChart(lat || undefined, lng || undefined, iso);
      setData(d);
      setSelected(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function geo() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude.toFixed(4));
      setLng(pos.coords.longitude.toFixed(4));
    });
  }

  const bright = data
    ? data.stars.filter((s) => s.visible).sort((a, b) => a.magnitude - b.magnitude).slice(0, 12)
    : [];
  const upBodies = data ? data.bodies.filter((b) => b.visible) : [];
  const visibleCount = data ? data.stars.filter((s) => s.visible).length : 0;

  return (
    <div className="stack">
      <section className="glass head">
        <div>
          <p className="eyebrow">Carta celeste</p>
          <h1>El cielo sobre tu cabeza, ahora mismo</h1>
          <p className="muted">
            Una carta circular: el cenit queda en el centro, el horizonte en el borde y el norte arriba.
            Estrellas, planetas y la Luna calculados con efemérides reales.
          </p>
        </div>
        <form className="loc-form" onSubmit={load}>
          <input type="number" step="0.0001" placeholder="Latitud" value={lat} onChange={(e) => setLat(e.target.value)} />
          <input type="number" step="0.0001" placeholder="Longitud" value={lng} onChange={(e) => setLng(e.target.value)} />
          <input type="datetime-local" value={when} onChange={(e) => setWhen(e.target.value)} />
          <button type="button" className="ghost" onClick={geo}>
            Mi ubicación
          </button>
          <button className="btn" type="submit">
            Dibujar carta
          </button>
        </form>
      </section>

      {error && <p className="glass card">{error}</p>}
      {loading && <p className="muted">Calculando posiciones…</p>}

      {data && (
        <>
          <div className="carta-meta">
            <span>
              {parseUtc(data.when).toLocaleString()} · {visibleCount} estrellas sobre el horizonte
            </span>
            <span className="muted">
              {data.location.latitude.toFixed(3)}, {data.location.longitude.toFixed(3)}
            </span>
          </div>

          <div className="carta-layout">
            <div className="glass carta-panel">
              <svg className="carta-svg" viewBox={data.viewBox} role="img" aria-label="Carta celeste">
                <defs>
                  <radialGradient id="cartaFondo" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0d2046" />
                    <stop offset="100%" stopColor="#030816" />
                  </radialGradient>
                  <clipPath id="cartaCielo">
                    <circle cx={CENTER} cy={CENTER} r={HORIZON} />
                  </clipPath>
                </defs>

                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={HORIZON}
                  fill="url(#cartaFondo)"
                  stroke="var(--accent)"
                  strokeOpacity="0.55"
                  strokeWidth="2"
                />
                {RINGS.map((alt) => (
                  <circle
                    key={alt}
                    cx={CENTER}
                    cy={CENTER}
                    r={ringRadius(alt)}
                    fill="none"
                    stroke="var(--line)"
                    strokeDasharray="7 9"
                  />
                ))}

                <g clipPath="url(#cartaCielo)">
                  {data.lines.map((l, i) => (
                    <line
                      key={`${l.from}-${l.to}-${i}`}
                      x1={l.x1}
                      y1={l.y1}
                      x2={l.x2}
                      y2={l.y2}
                      stroke="var(--accent)"
                      strokeOpacity="0.32"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  ))}
                  {data.stars.map((s) => (
                    <circle
                      key={s.name}
                      className={`carta-star${selected?.name === s.name ? " is-sel" : ""}`}
                      cx={s.x}
                      cy={s.y}
                      r={s.size}
                      fillOpacity={s.opacity}
                      onClick={() => setSelected({ ...s, kind: "star" })}
                    />
                  ))}
                  {data.bodies.map((b) => (
                    <g
                      key={b.slug}
                      className={`carta-body${selected?.name === b.name ? " is-sel" : ""}`}
                      onClick={() => setSelected({ ...b, kind: "body" })}
                    >
                      <circle cx={b.x} cy={b.y} r={b.size} fillOpacity={b.opacity} />
                      <text x={b.x + b.size + 7} y={b.y + 5}>
                        {b.name}
                      </text>
                    </g>
                  ))}
                </g>

                {RINGS.map((alt) => (
                  <text key={`g${alt}`} className="carta-grid-label" x={CENTER - ringRadius(alt) - 8} y={CENTER - 8}>
                    {alt}°
                  </text>
                ))}
                {data.cardinals.map((c) => (
                  <text key={c.label} className="carta-cardinal" x={c.x} y={c.y}>
                    {c.label}
                  </text>
                ))}
              </svg>
            </div>

            <div className="carta-side">
              {selected ? (
                <article className="glass card">
                  <p className="eyebrow">{selected.kind === "star" ? "Estrella" : "Cuerpo del sistema solar"}</p>
                  <h3>{selected.name}</h3>
                  {selected.constellation && <p className="muted">Constelación {selected.constellation}</p>}
                  {selected.magnitude != null && <p>Magnitud {selected.magnitude}</p>}
                  <p>
                    Altura {selected.altitude}° · azimut {selected.azimuth}° ({compass(selected.azimuth)})
                  </p>
                  <p className="muted">
                    {selected.altitude >= 0 ? "Sobre el horizonte" : "Bajo el horizonte ahora mismo"}
                  </p>
                  <button type="button" className="ghost" onClick={() => setSelected(null)}>
                    Cerrar
                  </button>
                </article>
              ) : (
                <article className="glass card">
                  <p className="eyebrow">Cómo leerla</p>
                  <p>
                    Toca una estrella o un planeta para ver sus datos. El círculo exterior es el horizonte y el
                    centro, el cenit (justo sobre ti).
                  </p>
                  <p className="muted">
                    Los anillos punteados marcan 30° y 60° de altura. Cuanto más cerca del centro, más alto está el
                    objeto.
                  </p>
                </article>
              )}

              <article className="glass card">
                <p className="eyebrow">Arriba ahora</p>
                {upBodies.length ? (
                  <ul className="carta-list">
                    {upBodies.map((b) => (
                      <li key={b.slug}>
                        <button type="button" onClick={() => setSelected({ ...b, kind: "body" })}>
                          {b.name}
                        </button>
                        <span className="muted">{b.altitude}°</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="muted">Ningún planeta visible ahora.</p>
                )}
              </article>

              <article className="glass card">
                <p className="eyebrow">Estrellas más brillantes</p>
                <ul className="carta-list">
                  {bright.map((s) => (
                    <li key={s.name}>
                      <button type="button" onClick={() => setSelected({ ...s, kind: "star" })}>
                        {s.name}
                      </button>
                      <span className="muted">
                        mag {s.magnitude} · {s.altitude}°
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
