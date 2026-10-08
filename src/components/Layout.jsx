import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import ChatWidget from "./ChatWidget.jsx";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/explorar", label: "Explorar" },
  { to: "/observar", label: "Esta noche" },
  { to: "/carta", label: "Carta celeste" },
  { to: "/iss", label: "ISS" },
  { to: "/clasificar", label: "Clasificar" },
  { to: "/quiz", label: "Quiz" },
];

export default function Layout() {
  const { user, logout } = useAuth();
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink to="/" className="brand">
          <span className="brand-mark">✦</span>
          <span>AstroIA</span>
        </NavLink>
        <nav>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"}>
              {l.label}
            </NavLink>
          ))}
        </nav>
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
      <main className="page">
        <Outlet />
      </main>
      <ChatWidget />
    </div>
  );
}
