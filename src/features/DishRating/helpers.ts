export type StarType = 'full' | 'empty' | 'half'

export const getStarsTypes = (rating: number) => {
  const stars: StarType[] = []
  debugger
  for (let i = 1; i < 10; i++) {
    if (rating > i - 0.25) {
      stars.push('full')
    } else if (rating > i - 0.5) {
      stars.push('half')
    } else {
      stars.push('empty')
    }
  }

  return stars
}
