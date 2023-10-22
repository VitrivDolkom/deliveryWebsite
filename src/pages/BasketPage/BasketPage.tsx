import { Typography } from '@/shared/uikit'
import { BasketDishesList } from './BasketDishesList/BasketDishesList'
import { useBasketPage } from './useBasketPage'
import s from './styles.module.css'

export const BasketPage = () => {
  const { basket } = useBasketPage()

  return (
    <div className={s.wrapper}>
      <Typography tag="h1" variant="h1">
        Товары в корзине
      </Typography>
      {!!basket && <BasketDishesList basket={basket} />}
    </div>
  )
}
