import { Typography } from '@/shared/uikit'
import { BasketDishesList } from './BasketDishesList/BasketDishesList'
import s from './styles.module.css'

const dishes: DishBasketDto[] = [
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'Название Название Название Название Название',
    price: 120,
    totalPrice: 123123,
    amount: 1,
    image: 'https://mistertako.ru/uploads/products/77888c7e-8327-11ec-8575-0050569dbef0.'
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'Название Название Название Название Название',
    price: 120,
    totalPrice: 123123,
    amount: 10,
    image: 'https://mistertako.ru/uploads/products/77888c7e-8327-11ec-8575-0050569dbef0.'
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'Название Название Название Название Название',
    price: 120,
    totalPrice: 123123,
    amount: 10,
    image: 'https://mistertako.ru/uploads/products/77888c7e-8327-11ec-8575-0050569dbef0.'
  }
]

export const CartPage = () => (
  <div className={s.wrapper}>
    <Typography tag="h1" variant="h1">
      Товары в корзине
    </Typography>
    <BasketDishesList dishes={dishes} />
  </div>
)
