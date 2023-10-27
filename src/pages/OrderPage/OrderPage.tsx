import classNames from 'classnames/bind'
import { ToastContainer } from 'react-toastify'
import { DishBasketCard, SearchLoader } from '@/shared/components'
import { OrderStatusEnum } from '@/shared/const'
import { getDateFromDateTime, getTimeFromDateTime } from '@/shared/lib/helpers'
import { Button, Typography } from '@/shared/uikit'
import { useOrderPage } from './useOrderPage'
import s from './styles.module.css'

const cx = classNames.bind(s)

export const OrderPage = () => {
  const { order, isLoading, addressLoading, addressChain, onOrderConfirmClick } = useOrderPage()

  if (!order) {
    return null
  }

  if (isLoading) {
    return <SearchLoader />
  }

  return (
    <div>
      <ToastContainer />
      <div className={s.top}>
        <Typography tag="h1" variant="t6">
          Заказ #3234
        </Typography>
        {order.status === 'InProcess' && (
          <Button
            styleType="outlined"
            alertType="success"
            className="btn big"
            onClick={onOrderConfirmClick}
          >
            Подтвердить доставку
          </Button>
        )}
      </div>
      <div className={cx({ block: true, info: true })}>
        <Typography tag="p" variant="t1">
          Дата заказа: {getDateFromDateTime(order.orderTime)} {getTimeFromDateTime(order.orderTime)}
        </Typography>
        <Typography tag="p" variant="t1">
          Дата доставки: {getDateFromDateTime(order.deliveryTime)}{' '}
          {getTimeFromDateTime(order.deliveryTime)}
        </Typography>
        <Typography tag="p" variant="t1">
          Адрес доставки:{' '}
          {addressLoading || !addressChain
            ? 'Загрузка...'
            : addressChain.map((address) => address.text).join(', ')}
        </Typography>
        <Typography tag="p" variant="t1">
          Статус: {OrderStatusEnum[order.status]}
        </Typography>
      </div>
      <div className="block">
        <Typography tag="p" variant="t6">
          Список блюд:
        </Typography>
        <div className="block">
          {order.dishes.map((dish) => (
            <DishBasketCard dish={dish} />
          ))}
        </div>
      </div>
      <div className="block">
        <Typography tag="p" variant="t4">
          Стоимость заказа:
          <Typography tag="span" variant="t1">
            {' '}
            {order.price}руб.
          </Typography>
        </Typography>
      </div>
    </div>
  )
}
