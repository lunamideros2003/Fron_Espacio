import { useEffect } from "react";

const TITLES = {
  "/": "AstroIA — El cielo a tu nivel",
  "/explorar": "Explorar el catálogo · AstroIA",
  "/observar": "Qué observar esta noche · AstroIA",
  "/carta": "Carta celeste · AstroIA",
  "/iss": "Rastreador de la ISS · AstroIA",
  "/clasificar": "Clasificar luces · AstroIA",
  "/quiz": "Quiz del cielo · AstroIA",
  "/entrar": "Entrar · AstroIA",
  "/perfil": "Tu perfil · AstroIA",
};

export function titleForPath(pathname) {
  if (TITLES[pathname]) return TITLES[pathname];
  if (pathname.startsWith("/objeto/")) return "Objeto celeste · AstroIA";
  return "AstroIA — El cielo a tu nivel";
}

export function useDocumentTitle(title) {
  useEffect(() => {
    if (!title) return undefined;
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
