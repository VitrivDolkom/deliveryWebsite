import classNames from 'classnames/bind'
import { MenuItemImage } from '@/shared/components'
import { Typography } from '@/shared/uikit'
import s from './styles.module.css'

const cx = classNames.bind(s)

interface DishBasketCardProps {
  dish: DishBasketDto
}

export const DishBasketCard = ({ dish }: DishBasketCardProps) => (
  <div className={s.card}>
    <div className={s.img}>
      <MenuItemImage image={dish.image} />
    </div>
    <main className={s.content}>
      <Typography tag="p" variant="t4" className={cx({ name: true, ellipsis: true })}>
        {dish.name}
      </Typography>
      <Typography tag="p" variant="t1">
        Цена - {dish.price}руб.
      </Typography>
      <Typography tag="p" variant="t1" className={s.description}>
        Количество: {dish.amount}шт.
      </Typography>
    </main>
    <footer className={s.footer}>
      <Typography tag="p" variant="t4">
        Стоимость:{' '}
        <Typography tag="span" variant="t1">
          {dish.totalPrice}руб.
        </Typography>
      </Typography>
    </footer>
  </div>
)
