import classNames from 'classnames/bind'
import { ChangeBasketDishAmount } from '@/shared/components'
import { Button, Typography } from '@/shared/uikit'
import s from './styles.module.css'

const cx = classNames.bind(s)

interface BasketDishesListProps {
  basket: DishBasketDto[]
  onDishAdd: (dishId: string) => void
  onDishDelete: (dishId: string, increase?: boolean) => void
}

export const BasketDishesList = ({ basket, onDishDelete, onDishAdd }: BasketDishesListProps) => (
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
        <ChangeBasketDishAmount dish={dish} onDecreaseCLick={onDishDelete} onIncreaseCLick={onDishAdd} />
        <Button
          styleType="solid"
          alertType="danger"
          className="btn"
          onClick={() => onDishDelete(dish.id, false)}
        >
          Удалить
        </Button>
      </div>
    ))}
  </div>
)
