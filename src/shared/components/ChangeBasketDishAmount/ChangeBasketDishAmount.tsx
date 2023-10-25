import { Button } from '@/shared/uikit'
import s from './styles.module.css'

interface ChangeBasketDishAmountProps {
  onDecreaseCLick: (dishId: string) => void
  onIncreaseCLick: (dishId: string) => void
  dish: DishBasketDto
}

export const ChangeBasketDishAmount = ({
  dish,
  onDecreaseCLick,
  onIncreaseCLick
}: ChangeBasketDishAmountProps) => (
  <div className={s.change}>
    <Button
      styleType="outlined"
      alertType="info"
      disabled={dish.amount === 1}
      className={s.btn}
      onClick={() => onDecreaseCLick(dish.id)}
    >
      -
    </Button>
    <Button styleType="outlined" alertType="info" disabled={true} className={s.btn}>
      {dish.amount}
    </Button>
    <Button
      styleType="outlined"
      alertType="info"
      className={s.btn}
      onClick={() => onIncreaseCLick(dish.id)}
    >
      +
    </Button>
  </div>
)
