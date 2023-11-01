import { Button } from '@/shared/uikit'
import s from './styles.module.css'

interface ChangeBasketDishAmountProps {
  onDecreaseClick: (dishId: string, increase?: boolean) => void
  onIncreaseClick: (dishId: string) => void
  dish: DishBasketDto
}

export const ChangeBasketDishAmount = ({
  dish,
  onDecreaseClick,
  onIncreaseClick
}: ChangeBasketDishAmountProps) => (
  <div className={s.change}>
    <Button
      styleType="outlined"
      alertType="primary"
      disabled={dish.amount === 1}
      className={s.btn}
      onClick={(e) => {
        e.stopPropagation()
        onDecreaseClick(dish.id)
      }}
    >
      -
    </Button>
    <Button styleType="outlined" alertType="primary" disabled={true} className={s.btn}>
      {dish.amount}
    </Button>
    <Button
      styleType="outlined"
      alertType="primary"
      className={s.btn}
      onClick={(e) => {
        e.stopPropagation()
        onIncreaseClick(dish.id)
      }}
    >
      +
    </Button>
  </div>
)
