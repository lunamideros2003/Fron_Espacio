import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("astroia_token");
    if (!t) {
      setReady(true);
      return;
    }
    api
      .me()
      .then((d) => setUser(d.user))
      .catch(() => localStorage.removeItem("astroia_token"))
      .finally(() => setReady(true));
  }, []);

  const value = useMemo(
    () => ({
      user,
      ready,
      login: (payload) => {
        localStorage.setItem("astroia_token", payload.token);
        setUser(payload.user);
      },
      logout: () => {
        localStorage.removeItem("astroia_token");
        setUser(null);
      },
      setUser,
    }),
    [user, ready]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
