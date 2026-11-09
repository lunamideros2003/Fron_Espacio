import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { titleForPath, useDocumentTitle } from "../hooks/useDocumentTitle.js";
import ChatWidget from "./ChatWidget.jsx";
import ConstellationMenu from "./ConstellationMenu.jsx";

export default function Layout() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const home = pathname === "/";
  useDocumentTitle(titleForPath(pathname));

  return (
    <div className="app-shell">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header className="topbar">
        <NavLink to="/" className="brand">
          <span className="brand-mark">✦</span>
          <span>AstroIA</span>
        </NavLink>
        <div className="session">
          {user ? (
            <>
              <NavLink to="/perfil" className="user-chip">
                {user.name}
              </NavLink>
              <button type="button" className="ghost" onClick={logout}>
                Salir
              </button>
            </>
          ) : (
            <NavLink to="/entrar" className="btn">
              Entrar
            </NavLink>
          )}
        </div>
      </header>
      {!home && (
        <nav className="constellation-bar" aria-label="Menú del cielo">
          <ConstellationMenu compact />
        </nav>
      )}
      <main className="page" id="contenido">
        <Outlet />
      </main>
      <ChatWidget />
    </div>
  );
}
