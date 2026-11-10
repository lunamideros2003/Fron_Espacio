export function to24Hour(hour, period) {
  const value = Number(hour);
  if (!Number.isInteger(value) || value < 1 || value > 12) return null;
  if (period === "PM") return value === 12 ? 12 : value + 12;
  return value === 12 ? 0 : value;
}

export function buildMoment(date, hour, minute, period) {
  if (!date || hour === "" || minute === "") return "";
  const minutes = Number(minute);
  if (!Number.isInteger(minutes) || minutes < 0 || minutes > 59) return "";
  const hours = to24Hour(hour, period);
  if (hours === null) return "";
  return `${date}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function momentWarning(date, hour, minute) {
  if (!date && hour === "" && minute === "") return "";
  if (date) {
    const year = Number(date.slice(0, 4));
    if (!Number.isInteger(year) || year < 1900 || year > 2026) {
      return "Pon un año entre 1900 y 2026";
    }
  }
  if (!date || hour === "" || minute === "") {
    return "Completa el día, la fecha, el año y la hora.";
  }
  const hours = Number(hour);
  const minutes = Number(minute);
  if (!Number.isInteger(hours) || hours < 1 || hours > 12) {
    return "Pon una hora entre 1 y 12.";
  }
  if (!Number.isInteger(minutes) || minutes < 0 || minutes > 59) {
    return "Pon minutos entre 0 y 59.";
  }
  return "";
}
