import classNames from 'classnames/bind'
import { Button, Typography } from '@/shared/uikit'
import s from './styles.module.css'

const cx = classNames.bind(s)

interface BasketDishesListProps {
  basket: DishBasketDto[]
}
export const BasketDishesList = ({ basket }: BasketDishesListProps) => (
  <div className={s.list}>
    {basket.map((dish, index) => (
      <div key={dish.id} className={s.dish}>
        <Typography tag="p" variant="t1">
          {index + 1}.
        </Typography>
        <div className={s.img}>
          <img src={dish.image} alt="" />
        </div>
        <div className={s.info}>
          <Typography tag="p" variant="t6" className={cx({ ellipsis: true, name: true })}>
            {dish.name}
          </Typography>
          <Typography tag="p" variant="t1">
            Цена/шт: {dish.price}руб.
          </Typography>
        </div>
        <div className={s.change}>
          <Button styleType="outlined" alertType="info" disabled={dish.amount === 1} className={s.btn}>
            -
          </Button>
          <Button styleType="outlined" alertType="info" disabled={true} className={s.btn}>
            {dish.amount}
          </Button>
          <Button styleType="outlined" alertType="info" className={s.btn}>
            +
          </Button>
        </div>
        <Button styleType="solid" alertType="danger" className="btn">
          Удалить
        </Button>
      </div>
    ))}
  </div>
)
