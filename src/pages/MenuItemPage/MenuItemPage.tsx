import { DishRating } from '@/features'
import { MenuItemImage } from '@/shared/components'
import { Typography } from '@/shared/uikit'
import s from './styles.module.css'

const dish: DishDto = {
  name: '4 сыра',
  description: '4 сыра: «Моцарелла», «Гауда», «Фета», «Дор-блю», сливочно-сырный соус, пряные травы',
  price: 360,
  image: 'https://mistertako.ru/uploads/products/77888c7e-8327-11ec-8575-0050569dbef0.',
  vegetarian: true,
  rating: 8.75,
  category: 'Pizza',
  id: 'e4698ac7-7d9e-456e-2741-08dbc899a338'
}

export const MenuItemPage = () => (
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
    <DishRating rating={dish.rating} />
    <Typography tag="p" variant="t1" className={s.description}>
      {dish.description}
    </Typography>
    <Typography tag="p" variant="t4">
      Цена - {dish.price}р/шт
    </Typography>
  </div>
)
