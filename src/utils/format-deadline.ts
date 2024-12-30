import { format, isToday, isTomorrow } from "date-fns"

export function formatDeadline(deadline: string) {
  const date = new Date(deadline)
  const now = new Date()

  if (date < now) return "Atrasada!"
  if (isToday(date)) return `Hoje às ${format(date, "HH:mm")}`
  if (isTomorrow(date)) return `Amanhã às ${format(date, "HH:mm")}`
  return format(date, "dd/MM/yyyy 'às' HH:mm")
}