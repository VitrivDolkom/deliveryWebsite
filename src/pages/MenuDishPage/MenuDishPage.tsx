import { DishRating } from '@/features'
import { ToastContainer } from 'react-toastify'
import { MenuItemImage } from '@/shared/components'
import { Typography } from '@/shared/uikit'
import { useMenuDishPage } from './useMenuDishPage'
import s from './styles.module.css'

export const MenuDishPage = () => {
  const { dish, onRatingClick, availableRating } = useMenuDishPage()

  if (!dish) {
    return null
  }

  return (
    <div className={s.wrapper}>
      <ToastContainer />
      <div className={s.img}>
        <MenuItemImage image={dish.image} vegetarian={dish.vegetarian} />
      </div>
      <Typography tag="h2" variant="t6" className={s.name}>
        {dish.name}
      </Typography>
      <Typography tag="p" variant="t2" className={s.category}>
        Категория блюда - {dish.category}
      </Typography>
      {availableRating && <Typography variant="t2">Вы можете оценить блюдо</Typography>}
      <DishRating rating={dish.rating} size="s" onRatingClick={onRatingClick} />
      <Typography tag="p" variant="t1" className={s.description}>
        {dish.description}
      </Typography>
      <Typography tag="p" variant="t4">
        Цена - {dish.price}р/шт
      </Typography>
    </div>
  )
}
