import { HOME_VIEW } from "./viewBox.js";

export function percentX(x, view = HOME_VIEW) {
  return `${(x / view.w) * 100}%`;
}

export function percentY(y, view = HOME_VIEW) {
  return `${(y / view.h) * 100}%`;
}

export function lineEnds(stars, pair) {
  const from = stars.find((star) => star.id === pair[0]);
  const to = stars.find((star) => star.id === pair[1]);
  if (!from || !to) return null;
  return {
    key: `${from.id}-${to.id}`,
    x1: from.x,
    y1: from.y,
    x2: to.x,
    y2: to.y,
  };
}
