import { ToastContainer } from 'react-toastify'
import { Typography } from '@/shared/uikit'
import { BasketDishesList } from './BasketDishesList/BasketDishesList'
import { useBasketPage } from './useBasketPage'
import s from './styles.module.css'

export const BasketPage = () => {
  const { basket, onDishAdd, onDishDelete } = useBasketPage()

  return (
    <div className={s.wrapper}>
      <ToastContainer />
      <Typography tag="h1" variant="h1">
        {!basket?.length ? 'Корзина пуста' : 'Товары в корзине'}
      </Typography>
      {!!basket && (
        <BasketDishesList basket={basket} onDishDelete={onDishDelete} onDishAdd={onDishAdd} />
      )}
    </div>
  )
}
