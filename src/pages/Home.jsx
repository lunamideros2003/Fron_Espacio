import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="stack">
      <section className="hero glass">
        <p className="eyebrow">Caso de estudio · astronomía sin saturarte</p>
        <h1>Hay demasiado cielo. AstroIA te lo traduce a tu nivel.</h1>
        <p className="lead">
          Elige un planeta, una estrella o un fenómeno y recibe una explicación clara.
          Pregunta al chatbot, clasifica luces extrañas y descubre qué puedes observar esta noche.
        </p>
        <div className="actions">
          <Link className="btn" to="/observar">
            ¿Qué puedo observar esta noche?
          </Link>
          <Link className="btn ghost" to="/explorar">
            Explorar el catálogo
          </Link>
        </div>
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
