import { DishRating } from '@/features'
import { MenuItemImage } from '@/shared/components'
import { Typography } from '@/shared/uikit'
import { useMenuDishPage } from './useMenuDishPage'
import s from './styles.module.css'

export const MenuItemPage = () => {
  const { dish, onRatingClick, successRating, ratingError, availableRating } = useMenuDishPage()

  if (!dish) {
    return null
  }

  return (
    <div className={s.wrapper}>
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
      {(!!ratingError || !availableRating) && <Typography variant="err1">{ratingError}</Typography>}
      <DishRating rating={dish.rating} size="s" onRatingClick={onRatingClick} />
      {successRating && <Typography>Спасибо за оценку</Typography>}
      <Typography tag="p" variant="t1" className={s.description}>
        {dish.description}
      </Typography>
      <Typography tag="p" variant="t4">
        Цена - {dish.price}р/шт
      </Typography>
    </div>
  )
}
