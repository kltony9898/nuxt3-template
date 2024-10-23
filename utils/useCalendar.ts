export const useCalendar = (year: number, month: number): string[] => {
  const dateList: string[] = []

  const firstDayOfMonth = new Date(year, month - 1, 1)

  const firstSunday = new Date(firstDayOfMonth)
  firstSunday.setDate(firstSunday.getDate() - firstSunday.getDay())

  const lastDayOfMonth = new Date(year, month, 0)

  const lastSaturday = new Date(lastDayOfMonth)
  lastSaturday.setDate(lastSaturday.getDate() + (6 - lastSaturday.getDay()))

  const rangeDateList = Array.from(
    { length: (lastSaturday.getTime() - firstSunday.getTime()) / (24 * 60 * 60 * 1000) + 1 },
    (_, index) => useDateFormat(new Date(firstSunday.getTime() + index * (24 * 60 * 60 * 1000)), 'YYYY-MM-DD').value
  )

  dateList.push(...rangeDateList)

  return dateList
}
