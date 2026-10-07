import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Observar() {
  const { user } = useAuth();
  const [lat, setLat] = useState(user?.latitude ?? "");
  const [lng, setLng] = useState(user?.longitude ?? "");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function geo() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude.toFixed(4));
      setLng(pos.coords.longitude.toFixed(4));
    });
  }

  async function load(e) {
    e?.preventDefault();
    setLoading(true);
    setError("");
    try {
      const d = await api.tonight(lat || undefined, lng || undefined);
      setData(d);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="stack">
      <section className="glass head">
        <div>
          <p className="eyebrow">Cielo de esta noche</p>
          <h1>¿Qué puedo observar esta noche?</h1>
          <p className="muted">
            Usamos tu ubicación, el clima de Open-Meteo y las posiciones reales de planetas y estrellas.
          </p>
        </div>
        <form className="loc-form" onSubmit={load}>
          <input type="number" step="0.0001" placeholder="Latitud" value={lat} onChange={(e) => setLat(e.target.value)} />
          <input type="number" step="0.0001" placeholder="Longitud" value={lng} onChange={(e) => setLng(e.target.value)} />
          <button type="button" className="ghost" onClick={geo}>
            Mi ubicación
          </button>
          <button className="btn" type="submit">
            Recomendar
          </button>
        </form>
      </section>
      {error && <p className="glass card">{error}</p>}
      {loading && <p className="muted">Calculando el cielo…</p>}
      {data && (
        <>
          <div className="grid-3">
            <article className="glass card">
              <h3>Condiciones</h3>
              <p>
                Nubes: {data.weather.cloudCover}% · visibilidad {data.weather.visibilityKm} km
              </p>
              <p>{data.weather.message}</p>
              <small className="muted">
                Atardecer {data.weather.sunset?.slice(11, 16)} · amanecer {data.weather.sunrise?.slice(11, 16)}
              </small>
            </article>
            <article className="glass card">
              <h3>Luna</h3>
              <p>
                {data.moon.phaseName} · {data.moon.illumination}% iluminada
              </p>
            </article>
            <article className="glass card">
              <h3>ISS</h3>
              {data.iss ? (
                <p>
                  Lat {data.iss.latitude.toFixed(1)}°, lon {data.iss.longitude.toFixed(1)}° · {Math.round(data.iss.altitudeKm)} km
                </p>
              ) : (
                <p className="muted">Sin datos ISS en este momento.</p>
              )}
            </article>
          </div>
          <div className="grid-cards">
            {data.recommendations.map((r) => (
              <Link key={r.object.slug} to={`/objeto/${r.object.slug}`} className="glass card object-card">
                <span className="tag">{r.label}</span>
                <h3>{r.object.name}</h3>
                <p>
                  Altitud {r.altitude}° · hacia el {r.direction}
                </p>
                <p className="muted">{r.object.funFact}</p>
              </Link>
            ))}
          </div>
          {!data.recommendations.length && (
            <p className="glass card">Ahora mismo hay pocos objetos altos. Prueba más tarde o en un cielo más oscuro.</p>
          )}
        </>
      )}
    </div>
  );
}
