import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";
import PlaceNote from "../components/PlaceNote.jsx";
import { useSkyPlace } from "../hooks/useSkyPlace.js";
import { formatDegrees, formatLocalTime } from "../lib/format.js";

export default function Observar() {
  const skyPlace = useSkyPlace();
  const { place } = skyPlace;
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!place) return;
    let cancel = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const d = await api.tonight(place.latitude, place.longitude);
        if (!cancel) setData(d);
      } catch (err) {
        if (!cancel) setError(err.message);
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => {
      cancel = true;
    };
  }, [place]);

  return (
    <div className="stack">
      <section className="glass head">
        <div>
          <p className="eyebrow">Cielo de esta noche</p>
          <h1>¿Qué puedo observar esta noche?</h1>
          <p className="muted">
            Ubicamos tu cielo automáticamente, con el clima de Open-Meteo y las posiciones reales de planetas y
            estrellas.
          </p>
          <PlaceNote {...skyPlace} />
        </div>
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
                Atardecer {formatLocalTime(data.weather.sunset)} · amanecer {formatLocalTime(data.weather.sunrise)}
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
                  Lat {formatDegrees(data.iss.latitude)}, lon {formatDegrees(data.iss.longitude)} ·{" "}
                  {Math.round(data.iss.altitudeKm)} km
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
                  Altitud {formatDegrees(r.altitude, 0)} · hacia el {r.direction}
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
