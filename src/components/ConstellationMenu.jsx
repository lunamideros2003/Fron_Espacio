import { Link, useLocation } from "react-router-dom";
import { accountTarget } from "../constellation/accountStar.js";
import { skyDust } from "../constellation/dust.js";
import { lineEnds, percentX, percentY } from "../constellation/geometry.js";
import { COMPACT_LINES, HOME_LINES } from "../constellation/lines.js";
import { COMPACT_STARS, HOME_STARS } from "../constellation/stars.js";
import { COMPACT_VIEW, HOME_VIEW } from "../constellation/viewBox.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function ConstellationMenu({ compact = false }) {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const view = compact ? COMPACT_VIEW : HOME_VIEW;
  const baseStars = compact ? COMPACT_STARS : HOME_STARS;
  const baseLines = compact ? COMPACT_LINES : HOME_LINES;
  const account = accountTarget(user);

  const stars = baseStars.map((star) => (star.id === "cuenta" ? { ...star, ...account } : star));
  const lines = baseLines.map((pair) => lineEnds(stars, pair)).filter(Boolean);
  const dust = skyDust(compact ? 24 : 70, 42, view);

  function active(star) {
    if (star.id === "inicio") return pathname === "/";
    return pathname === star.to;
  }

  return (
    <>
      <p className="constellation-sign">Menú</p>
      {!compact && (
        <p className="constellation-hint">
          A continuación, el menú: selecciona una sección que te gustaría explorar.
        </p>
      )}
      <div className={`constellation-stage${compact ? " is-compact" : ""}`} aria-label="Menú del cielo">
        <svg
          className="constellation-svg"
          viewBox={`0 0 ${view.w} ${view.h}`}
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          {dust.map((dot) => (
            <circle key={dot.id} cx={dot.x} cy={dot.y} r={dot.r} fill="#ffffff" opacity={dot.o} />
          ))}
          {lines.map((line) => (
            <line key={line.key} className="constellation-line" x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} />
          ))}
        </svg>
        {stars.map((star, index) => (
          <Link
            key={star.id}
            to={star.to}
            className={`constellation-hit${star.bright ? " is-bright" : ""}${active(star) ? " is-active" : ""}`}
            style={{
              left: percentX(star.x, view),
              top: percentY(star.y, view),
              animationDelay: `${index * 0.35}s`,
            }}
            data-side={star.side}
            aria-current={active(star) ? "page" : undefined}
            aria-label={star.label}
            title={star.label}
          >
            <span className="constellation-label">{star.label}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
