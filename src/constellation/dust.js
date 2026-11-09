import { HOME_VIEW } from "./viewBox.js";

function nextRandom(state) {
  const value = (state.seed * 16807) % 2147483647;
  state.seed = value;
  return (value - 1) / 2147483646;
}

export function skyDust(count = 70, seed = 42, view = HOME_VIEW) {
  const state = { seed };
  return Array.from({ length: count }, (_, id) => ({
    id,
    x: nextRandom(state) * view.w,
    y: nextRandom(state) * view.h,
    r: 0.45 + nextRandom(state) * 1.35,
    o: 0.18 + nextRandom(state) * 0.55,
  }));
}
