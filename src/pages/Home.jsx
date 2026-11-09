import ConstellationMenu from "../components/ConstellationMenu.jsx";
import PlaceNote from "../components/PlaceNote.jsx";
import { useSkyPlace } from "../hooks/useSkyPlace.js";

export default function Home() {
  const skyPlace = useSkyPlace();

  return (
    <div className="stack">
      <section className="home-sky">
        <div className="home-sky-head">
          <p className="eyebrow">Menú del cielo</p>
          <h1>Elige una estrella</h1>
          <p className="lead">Cada punto de la constelación es una parte de AstroIA. Tócala para entrar.</p>
          <PlaceNote {...skyPlace} />
        </div>
        <ConstellationMenu />
      </section>

      <section className="grid-3">
        <article className="glass card">
          <h3>Explicaciones adaptadas</h3>
          <p>Principiante, intermedio o avanzado. El mismo objeto, tres profundidades.</p>
        </article>
        <article className="glass card">
          <h3>Cielo real</h3>
          <p>Posiciones planetarias, fase lunar y nubes con APIs gratuitas (NASA y Open-Meteo).</p>
        </article>
        <article className="glass card">
          <h3>Aprende jugando</h3>
          <p>Quiz generado desde el catálogo y puntuaciones guardadas en tu perfil.</p>
        </article>
      </section>
    </div>
  );
}
