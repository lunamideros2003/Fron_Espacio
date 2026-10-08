// En desarrollo Vite hace proxy de /api -> localhost:4000.
// En producción (Vercel) apunta al backend desplegado con VITE_API_URL.
const BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

const token = () => localStorage.getItem("astroia_token");

async function request(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  const t = token();
  if (t) headers.Authorization = `Bearer ${t}`;
  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Error de red");
  return data;
}

export const api = {
  health: () => request("/api/health"),
  register: (body) => request("/api/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body) => request("/api/auth/login", { method: "POST", body: JSON.stringify(body) }),
  me: () => request("/api/auth/me"),
  updateMe: (body) => request("/api/auth/me", { method: "PATCH", body: JSON.stringify(body) }),
  objects: (params = "") => request(`/api/objects${params}`),
  object: (slug, level) => request(`/api/objects/${slug}${level ? `?level=${level}` : ""}`),
  tonight: (lat, lng, date) => {
    const q = new URLSearchParams();
    if (lat != null) q.set("lat", lat);
    if (lng != null) q.set("lng", lng);
    if (date) q.set("date", date);
    const s = q.toString();
    return request(`/api/observe/tonight${s ? `?${s}` : ""}`);
  },
  logObservation: (body) => request("/api/observe/log", { method: "POST", body: JSON.stringify(body) }),
  myObservations: () => request("/api/observe/mine"),
  quiz: (level) => request(`/api/quiz/generate?level=${level || "beginner"}&count=5`),
  submitQuiz: (body) => request("/api/quiz/submit", { method: "POST", body: JSON.stringify(body) }),
  scores: () => request("/api/quiz/scores"),
  chat: (body) => request("/api/chat", { method: "POST", body: JSON.stringify(body) }),
  classify: (body) => request("/api/chat/classify", { method: "POST", body: JSON.stringify(body) }),
  skyChart: (lat, lng, date) => {
    const q = new URLSearchParams();
    if (lat != null) q.set("lat", lat);
    if (lng != null) q.set("lng", lng);
    if (date) q.set("date", date);
    const s = q.toString();
    return request(`/api/sky/chart${s ? `?${s}` : ""}`);
  },
  issTrack: (minutes, step) => {
    const q = new URLSearchParams();
    if (minutes) q.set("minutes", minutes);
    if (step) q.set("step", step);
    const s = q.toString();
    return request(`/api/iss/track${s ? `?${s}` : ""}`);
  },
  issOverhead: (lat, lng, hours) => {
    const q = new URLSearchParams();
    if (lat != null) q.set("lat", lat);
    if (lng != null) q.set("lng", lng);
    if (hours) q.set("hours", hours);
    const s = q.toString();
    return request(`/api/iss/overhead${s ? `?${s}` : ""}`);
  },
};
