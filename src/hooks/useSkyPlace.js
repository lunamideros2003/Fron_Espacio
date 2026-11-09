import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { readSavedPlace, savePlace } from "../lib/placeStore.js";
import { readGps } from "./readGps.js";

export function useSkyPlace() {
  const { user, login } = useAuth();
  const [place, setPlace] = useState(() => readSavedPlace());
  const [status, setStatus] = useState(place ? "ready" : "locating");
  const [error, setError] = useState("");
  const started = useRef(false);
  const syncedUser = useRef(null);

  const choose = useCallback((next) => {
    if (!next) return null;
    savePlace(next);
    setPlace(next);
    setStatus("ready");
    setError("");
    return next;
  }, []);

  const detect = useCallback(async () => {
    setStatus("locating");
    setError("");
    const gps = await readGps();
    try {
      const data = await api.place(gps?.lat, gps?.lng);
      if (!data?.place) throw new Error("No pudimos ubicar tu cielo.");
      choose(data.place);
      return data.place;
    } catch (err) {
      setStatus("error");
      setError(err.message || "No pudimos ubicar tu cielo. Elige una ciudad o reintenta.");
      return null;
    }
  }, [choose]);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    if (!place) detect();
  }, [detect, place]);

  useEffect(() => {
    if (!user || !place) return;
    if (user.latitude != null && user.longitude != null) return;
    if (syncedUser.current === user.id) return;
    syncedUser.current = user.id;
    api
      .updateMe({ latitude: place.latitude, longitude: place.longitude, city: place.label })
      .then((saved) => {
        if (saved?.user) login(saved);
      })
      .catch(() => {});
  }, [login, place, user]);

  return { place, status, error, detect, choose };
}
