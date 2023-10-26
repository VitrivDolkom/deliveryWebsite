import preloader from '@/assets/gifs/search.gif'
import s from './styles.module.css'

export const SearchLoader = () => (
  <div className={s.preloader}>
    <img src={preloader} alt="Загрузка..." />
  </div>
)
