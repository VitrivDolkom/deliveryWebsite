import React from 'react'

export const useLocalStorage = <T,>(key: string, defaultValue: T | null = null) => {
  const [value, setValue] = React.useState<T>(() => {
    try {
      const saved = localStorage.getItem(key)

      if (!!saved) return JSON.parse(saved)
      else return defaultValue
    } catch (error: unknown) {
      return defaultValue
    }
  })

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return { value, setValue }
}
