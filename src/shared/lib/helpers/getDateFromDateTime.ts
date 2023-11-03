export const getDateFromDateTime = (dateTime: string): string => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [date, _time] = dateTime.split('T')
  return date
}
