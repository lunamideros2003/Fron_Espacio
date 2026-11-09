import { useEffect, useRef, useState } from "react";
import { usePlaceSearch } from "../hooks/usePlaceSearch.js";

export default function LocationPicker({ onGps, onSelect }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { results, loading, error } = usePlaceSearch(query);
  const box = useRef(null);

  useEffect(() => {
    if (!open) return;
    function onPointer(event) {
      if (box.current && !box.current.contains(event.target)) setOpen(false);
    }
    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function pick(place) {
    onSelect?.(place);
    setQuery("");
    setOpen(false);
  }

  function useGps() {
    onGps?.();
    setOpen(false);
  }

  return (
    <span className="place-picker" ref={box}>
      <button
        type="button"
        className="ghost place-picker-toggle"
        aria-expanded={open}
        aria-controls="place-picker-panel"
        onClick={() => setOpen((value) => !value)}
      >
        Cambiar
      </button>

      {open && (
        <div className="place-picker-panel glass" id="place-picker-panel" role="dialog" aria-label="Cambiar ubicación">
          <button type="button" className="ghost place-gps" onClick={useGps}>
            Usar mi ubicación
          </button>
          <input
            autoFocus
            type="search"
            autoComplete="off"
            spellCheck={false}
            maxLength={80}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Busca tu ciudad"
            aria-label="Buscar ciudad"
          />
          <p className="muted place-picker-hint">Sin coordenadas: elige una ciudad o usa tu GPS.</p>
          {loading && <p className="muted">Buscando…</p>}
          {error && <p className="bad">{error}</p>}
          {!loading && !error && query.trim().length >= 2 && results.length === 0 && (
            <p className="muted">No encontramos esa ciudad.</p>
          )}
          {results.length > 0 && (
            <ul className="place-results">
              {results.map((result) => (
                <li key={`${result.latitude},${result.longitude}`}>
                  <button type="button" onClick={() => pick(result)}>
                    {result.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </span>
  );
}
