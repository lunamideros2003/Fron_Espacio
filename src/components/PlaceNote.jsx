import { placeMessage } from "../constellation/placeCopy.js";
import LocationPicker from "./LocationPicker.jsx";

export default function PlaceNote({ place, status, error, detect, choose }) {
  if (status === "locating") {
    return (
      <p className="place-note muted" role="status">
        <span className="place-pulse" aria-hidden="true" />
        Buscando tu cielo…
      </p>
    );
  }

  if (error) {
    return (
      <p className="place-note">
        <span className="bad">{error}</span>
        <button type="button" className="ghost" onClick={detect}>
          Reintentar
        </button>
      </p>
    );
  }

  if (!place) return null;

  return (
    <div className="place-note" role="status" aria-live="polite">
      <span className="place-pin" aria-hidden="true">
        ✦
      </span>
      <strong>{place.label}</strong>
      <span className="muted">{placeMessage(place.source)}</span>
      <LocationPicker onGps={detect} onSelect={choose} />
    </div>
  );
}
