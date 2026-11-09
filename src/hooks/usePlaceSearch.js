import { useEffect, useState } from "react";
import { api } from "../api.js";
import { useDebounce } from "./useDebounce.js";

export function usePlaceSearch(query, delay = 350) {
  const debounced = useDebounce(query, delay);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const text = debounced.trim();
    if (text.length < 2) {
      setResults([]);
      setLoading(false);
      setError("");
      return;
    }

    let cancel = false;
    setLoading(true);
    setError("");
    api
      .searchPlaces(text)
      .then((data) => {
        if (!cancel) setResults(data.results || []);
      })
      .catch((err) => {
        if (!cancel) {
          setResults([]);
          setError(err.message || "No pudimos buscar esa ciudad.");
        }
      })
      .finally(() => {
        if (!cancel) setLoading(false);
      });

    return () => {
      cancel = true;
    };
  }, [debounced]);

  return { results, loading, error };
}
