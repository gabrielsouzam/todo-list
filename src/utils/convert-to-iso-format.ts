export function convertToIsoFormat(date: string, time: string): string {
  const localDateTime = new Date(`${date}T${time}`)
  
  const isoString = localDateTime.toISOString()
  
  return isoString
}