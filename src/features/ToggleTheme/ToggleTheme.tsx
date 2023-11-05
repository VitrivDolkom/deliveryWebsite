import dark from '@/assets/icons/dark.png'
import light from '@/assets/icons/light.png'
import { useThemeContext, useThemeSwitcherContext } from '@/shared/lib/contexts'
import s from './styles.module.css'

export const ToggleTheme = () => {
  const { theme } = useThemeContext()
  const { toggleTheme } = useThemeSwitcherContext()

  return (
    <button className={s.btn} onClick={toggleTheme}>
      {theme === 'light' ? <img src={dark} /> : <img src={light} />}
    </button>
  )
}
