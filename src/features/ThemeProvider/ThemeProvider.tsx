import React from 'react'
import { THEME_KEY } from '@/shared/const'
import { Theme, ThemeContext } from '@/shared/lib/contexts'
import { useLocalStorage } from '@/shared/lib/hooks'

export const ThemeProvider = ({
  children,
  defaultTheme = 'light'
}: {
  children: React.ReactNode
  defaultTheme?: Theme
}) => {
  const { value: theme, setValue: setTheme } = useLocalStorage(THEME_KEY, defaultTheme)
  const toggleTheme = () => setTheme((value) => (value === 'light' ? 'dark' : 'light'))

  React.useEffect(() => {
    document.body.classList.remove('light', 'dark')
    document.body.classList.add(theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
