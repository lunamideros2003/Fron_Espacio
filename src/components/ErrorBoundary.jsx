import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("AstroIA crashed", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="stack">
          <section className="glass card not-found">
            <p className="eyebrow">Error inesperado</p>
            <h1>El cielo se nubló un momento</h1>
            <p className="muted">Recarga la página para volver a calcular las posiciones.</p>
            <button type="button" className="btn" onClick={() => window.location.reload()}>
              Recargar
            </button>
          </section>
        </div>
      );
    }
    return this.props.children;
  }
}
