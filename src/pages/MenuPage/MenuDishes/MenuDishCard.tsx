import { DishRating } from '@/features'
import leaves from '@/assets/icons/leaves.png'
import { Typography } from '@/shared/uikit'
import s from './styles.module.css'

interface MenuDishCardProps {
  dish: DishDto
  onDishAdd?: (dishId: string) => void
  isLoading: boolean
  renderUserActions: () => JSX.Element
}

export const MenuDishCard = ({ dish, renderUserActions }: MenuDishCardProps) => (
  <div className={s.card}>
    <div className={s.img}>
      <img src={dish.image} alt="Картинка блюда" />
      {dish.vegetarian && (
        <div className={s.vegan}>
          <img src={leaves} alt="Вегатерианское блюдо" />
        </div>
      )}
    </div>
    <div className={s.top}>
      <Typography tag="h2" variant="t3" className={s.name}>
        {dish.name}
      </Typography>
      <Typography tag="p" variant="t1">
        Категория блюда - {dish.category}
      </Typography>
    </div>
    <main className={s.content}>
      <DishRating rating={dish.rating} />
      <Typography tag="p" variant="t1" className={s.description}>
        {dish.description}
      </Typography>
    </main>
    <footer className={s.footer}>
      <Typography tag="p" variant="t1">
        Цена - {dish.price}р
      </Typography>
      {renderUserActions?.()}
    </footer>
  </div>
)
