const MESSAGES = {
  browser: "Ubicación exacta de este dispositivo.",
  profile: "Usamos el lugar guardado en tu perfil.",
  search: "Usamos la ciudad que elegiste.",
  ip: "Ubicación aproximada a partir de tu conexión.",
  fallback: "No pudimos detectar el lugar, así que mostramos un cielo de ejemplo.",
};

export function placeMessage(source) {
  return MESSAGES[source] || MESSAGES.fallback;
}
