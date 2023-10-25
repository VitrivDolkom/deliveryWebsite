import leaves from '@/assets/icons/leaves.png'
import s from './styles.module.css'

interface MenuItemImageProps {
  image: string
  vegetarian: boolean
}

export const MenuItemImage = ({ image, vegetarian }: MenuItemImageProps) => (
  <div className={s.img}>
    <img src={image} alt="Картинка блюда" />
    {vegetarian && (
      <div className={s.vegan}>
        <img src={leaves} alt="Вегатерианское блюдо" />
      </div>
    )}
  </div>
)
