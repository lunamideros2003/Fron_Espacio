import { useEffect, useState } from "react";
import { api } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

const MAP_W = 1920;
const MAP_H = 960;
const DIRS = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];

const px = (lon) => ((lon + 180) / 360) * MAP_W;
const py = (lat) => ((90 - lat) / 180) * MAP_H;
const compass = (azimuth) => DIRS[Math.round(azimuth / 45) % 8];

function parseUtc(iso) {
  const hasZone = /Z$|[+-]\d{2}:\d{2}$/.test(iso);
  return new Date(hasZone ? iso : `${iso}Z`);
}

function toSegments(points) {
  const segments = [];
  let current = [];
  let previous = null;
  for (const p of points) {
    if (previous && Math.abs(p.longitude - previous.longitude) > 180) {
      segments.push(current);
      current = [];
    }
    current.push(p);
    previous = p;
  }
  if (current.length) segments.push(current);
  return segments;
}

const toPolyline = (points) => points.map((p) => `${px(p.longitude)},${py(p.latitude)}`).join(" ");

export default function Iss() {
  const { user } = useAuth();
  const [lat, setLat] = useState(user?.latitude ?? "");
  const [lng, setLng] = useState(user?.longitude ?? "");
  const [hours, setHours] = useState(24);
  const [track, setTrack] = useState(null);
  const [passes, setPasses] = useState(null);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load(nextHours = hours) {
    setLoading(true);
    setError("");
    try {
      const [t, o] = await Promise.all([
        api.issTrack(60, 300),
        api.issOverhead(lat || undefined, lng || undefined, nextHours),
      ]);
      setTrack(t);
      setPasses(o);
      setSelected(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(24);
  }, []);

  function geo() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude.toFixed(4));
      setLng(pos.coords.longitude.toFixed(4));
    });
  }

  const current = track?.current;
  const trackSegments = track ? toSegments(track.path) : [];
  const passList = passes?.passes ?? [];
  const observer = passes?.location;

  return (
    <div className="stack">
      <section className="glass head">
        <div>
          <p className="eyebrow">Rastreador de la ISS</p>
          <h1>¿Por dónde pasa la Estación Espacial?</h1>
          <p className="muted">
            Posición en vivo, órbita próxima sobre el mapa y los pases visibles desde tu ciudad en las próximas
            horas.
          </p>
        </div>
        <form
          className="loc-form"
          onSubmit={(e) => {
            e.preventDefault();
            load();
          }}
        >
          <input type="number" step="0.0001" placeholder="Latitud" value={lat} onChange={(e) => setLat(e.target.value)} />
          <input type="number" step="0.0001" placeholder="Longitud" value={lng} onChange={(e) => setLng(e.target.value)} />
          <button type="button" className="ghost" onClick={geo}>
            Mi ubicación
          </button>
          <button className="btn" type="submit">
            Buscar pases
          </button>
        </form>
      </section>

      {error && <p className="glass card">{error}</p>}
      {loading && <p className="muted">Consultando la órbita de la ISS…</p>}

      {track && (
        <>
          <div className="grid-3">
            <article className="glass card">
              <p className="eyebrow">Posición actual</p>
              {current ? (
                <>
                  <h3>
                    {current.latitude.toFixed(2)}°, {current.longitude.toFixed(2)}°
                  </h3>
                  <p>{Math.round(current.altitudeKm)} km de altura</p>
                  <p className="muted">{Math.round(current.velocityKmh)} km/h</p>
                </>
              ) : (
                <p className="muted">Sin datos en vivo.</p>
              )}
            </article>
            <article className="glass card">
              <p className="eyebrow">Tu ventana</p>
              <h3>
                {passList.length} pase{passList.length === 1 ? "" : "s"}
              </h3>
              <p className="muted">Mirando {hours} h hacia adelante, con {passes?.minElevation}° o más de altura.</p>
              <div className="chips">
                {[24, 48].map((h) => (
                  <button
                    key={h}
                    type="button"
                    className={hours === h ? "chip on" : "chip"}
                    onClick={() => {
                      setHours(h);
                      load(h);
                    }}
                  >
                    {h} h
                  </button>
                ))}
              </div>
            </article>
            <article className="glass card">
              <p className="eyebrow">Leyenda</p>
              <p>
                <span className="dot dot-track" /> Órbita de las últimas horas
              </p>
              <p>
                <span className="dot dot-pass" /> Pase sobre tu ciudad
              </p>
              <p>
                <span className="dot dot-you" /> Tu posición
              </p>
            </article>
          </div>

          <div className="mapa glass">
            <img src="/mapa-mundo.jpg" alt="Mapa del mundo" />
            <svg className="mapa-svg" viewBox={`0 0 ${MAP_W} ${MAP_H}`} preserveAspectRatio="none" aria-hidden="true">
              {trackSegments.map((segment, i) => (
                <polyline key={`t${i}`} className="iss-track" points={toPolyline(segment)} />
              ))}
              {passList.map((p, i) => {
                const isOn = selected === i;
                return toSegments(p.path).map((segment, j) => (
                  <polyline
                    key={`p${i}-${j}`}
                    className={`iss-pass${isOn ? " is-on" : ""}`}
                    points={toPolyline(segment)}
                  />
                ));
              })}
              {observer && (
                <g className="iss-you">
                  <circle cx={px(observer.longitude)} cy={py(observer.latitude)} r="16" />
                  <line
                    x1={px(observer.longitude) - 26}
                    y1={py(observer.latitude)}
                    x2={px(observer.longitude) + 26}
                    y2={py(observer.latitude)}
                  />
                  <line
                    x1={px(observer.longitude)}
                    y1={py(observer.latitude) - 26}
                    x2={px(observer.longitude)}
                    y2={py(observer.latitude) + 26}
                  />
                </g>
              )}
              {current && (
                <g className="iss-now">
                  <circle cx={px(current.longitude)} cy={py(current.latitude)} r="34" className="iss-halo" />
                  <circle cx={px(current.longitude)} cy={py(current.latitude)} r="17" className="iss-dot" />
                  <text x={px(current.longitude) + 30} y={py(current.latitude) + 12}>
                    ISS
                  </text>
                </g>
              )}
            </svg>
          </div>
        </>
      )}

      {passes && (
        <section className="glass card">
          <p className="eyebrow">Próximos pases sobre {passes.location.assumed ? "tu ubicación asumida" : "tu ubicación"}</p>
          {passList.length ? (
            <ol className="pases">
              {passList.map((p, i) => (
                <li key={p.start} className={selected === i ? "is-on" : ""}>
                  <button type="button" onClick={() => setSelected(selected === i ? null : i)}>
                    <strong>{parseUtc(p.start).toLocaleString()}</strong>
                    <span>
                      {p.durationMinutes} min · máx. {p.maxElevation}° hacia el {p.direction}
                    </span>
                    <span className="muted">
                      Sale por el {compass(p.riseAzimuth)} y se pone por el {compass(p.setAzimuth)}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          ) : (
            <p className="muted">
              En las próximas {passes.checkedHours} h no hay pases cómodos desde este punto. Prueba con 48 h o con
              otra ciudad.
            </p>
          )}
        </section>
      )}
    </div>
  );
}
