export function convertFromIsoFormat(isoString?: string) {
  if (!isoString) {
    return { date: "", time: "" };
  }

  const date = new Date(isoString);
  const formattedDate = date.toISOString().split("T")[0];
  const formattedTime = date.toTimeString().split(":").slice(0, 2).join(":");

  return { date: formattedDate, time: formattedTime };
}
