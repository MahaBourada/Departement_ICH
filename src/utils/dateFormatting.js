export function dateFormatting() {
  const date = new Date();

  const formatted = date.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Paris", // Optional: adjust for French local time
  });

  return formatted;
}
