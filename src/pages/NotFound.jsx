import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="stack">
      <section className="glass card not-found">
        <p className="eyebrow">Señal perdida</p>
        <h1>Esa estrella no está en el mapa</h1>
        <p className="muted">La página que buscabas no existe o cambió de órbita.</p>
        <div className="actions">
          <Link className="btn" to="/">
            Volver al cielo
          </Link>
          <Link className="ghost" to="/explorar">
            Explorar objetos
          </Link>
        </div>
      </section>
    </div>
  );
}
