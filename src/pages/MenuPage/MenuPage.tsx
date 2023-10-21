import { MenuDishCard } from './MenuDishCard/MenuDishCard'
import s from './styles.module.css'

const test: DishDto[] = [
  {
    name: '4 сыра',
    description: '4 сыра: «Моцарелла», «Гауда», «Фета», «Дор-блю», сливочно-сырный соус, пряные травы',
    price: 360,
    image: 'https://mistertako.ru/uploads/products/77888c7e-8327-11ec-8575-0050569dbef0.',
    vegetarian: true,
    rating: 5,
    category: 'Pizza',
    id: 'e4698ac7-7d9e-456e-2741-08dbc899a338'
  },
  {
    name: 'Party BBQ',
    description: 'Бекон, соленый огурчик, брусника, сыр «Моцарелла», сыр «Гауда», соус BBQ',
    price: 480,
    image: 'https://mistertako.ru/uploads/products/839d0250-8327-11ec-8575-0050569dbef0.',
    vegetarian: false,
    rating: 10,
    category: 'Pizza',
    id: 'a0ea8caf-e461-4877-2742-08dbc899a338'
  }
]

export const MenuPage = () => (
  <div className={s.list}>
    {test.map((dish) => (
      <MenuDishCard dish={dish} />
    ))}
  </div>
)
