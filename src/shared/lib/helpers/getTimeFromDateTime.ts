export const getTimeFromDateTime = (dateTime: string): string => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_date, time] = dateTime.split('T')
  return time.split(':').slice(0, 2).join(':')
}
