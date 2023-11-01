import { DishRating } from '@/features'
import { MenuItemImage } from '@/shared/components'
import { Typography } from '@/shared/uikit'
import s from './styles.module.css'

interface MenuDishCardProps {
  dish: DishDto
  onClick: () => void
  renderUserActions: () => JSX.Element
}

export const MenuDishCard = ({ dish, onClick, renderUserActions }: MenuDishCardProps) => (
  <div className={s.card} onClick={onClick}>
    <MenuItemImage image={dish.image} vegetarian={dish.vegetarian} />
    <div className={s.top}>
      <Typography tag="h2" variant="t3" className={s.name}>
        {dish.name}
      </Typography>
      <Typography tag="p" variant="t1">
        Категория блюда - {dish.category}
      </Typography>
    </div>
    <main className={s.content}>
      <DishRating rating={dish.rating} size="xs" />
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
