import { ButtonLoader } from '../ButtonLoader/ButtonLoader'
import s from './styles.module.css'

export const SearchLoader = () => (
  <div className={s.preloader}>
    <ButtonLoader />
  </div>
)
