import Select from 'react-select'
import { InputBlock, Pagination } from '@/shared/components'
import { dishCategoryOptions, dishSortingOptions } from '@/shared/lib/const'
import { Button } from '@/shared/uikit'
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

const pagination: PageInfoModel = {
  size: 5,
  count: 4,
  current: 1
}

export const MenuPage = () => (
  <div className="wrapper">
    <div className={s.top}>
      <Select options={dishCategoryOptions} isSearchable={false} isMulti className={s.select} />
      <Select options={dishSortingOptions} isSearchable={false} className={s.select} />
      <div className="vegan">
        <InputBlock label="Показать только вегатерианские" blockType="row" type="checkbox" />
      </div>
      <Button styleType="solid" alertType="info" className="btn">
        Применить
      </Button>
    </div>
    <div className={s.list}>
      {test.map((dish) => (
        <MenuDishCard key={dish.id} dish={dish} />
      ))}
    </div>
    <Pagination pagination={pagination} />
  </div>
)
