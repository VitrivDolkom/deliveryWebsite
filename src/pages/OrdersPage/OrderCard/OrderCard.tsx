import { Link } from 'react-router-dom'
import { OrderStatusEnum, routes } from '@/shared/const'
import { getDateFromDateTime, getTimeFromDateTime } from '@/shared/lib/helpers'
import { Button, Typography } from '@/shared/uikit'
import s from './styles.module.css'

interface OrderCardProps {
  order: OrderInfoDto
  onOrderConfirmClick: (orderId: string) => void
}

export const OrderCard = ({ order, onOrderConfirmClick }: OrderCardProps) => (
  <div className={s.card}>
    <div className={s.left}>
      <Link to={routes.order(order.id)}>
        <Typography tag="p" variant="t4" className={s.link}>
          Заказ от {getDateFromDateTime(order.orderTime)}
        </Typography>
      </Link>

      <Typography tag="p" variant="t1">
        Статус заказа - {OrderStatusEnum[order.status]}
      </Typography>

      <Typography tag="p" variant="t1">
        {order.status === 'Delivered' ? 'Доставлен' : 'Доставка ожидается в'}{' '}
        {getDateFromDateTime(order.deliveryTime)} {getTimeFromDateTime(order.deliveryTime)}
      </Typography>
    </div>
    <div className={s.right}>
      {order.status === 'InProcess' && (
        <Button
          styleType="outlined"
          alertType="success"
          className="btn big"
          onClick={() => onOrderConfirmClick(order.id)}
        >
          Подтвердить доставку
        </Button>
      )}

      <Typography tag="p" variant="t4">
        Стоимость заказа: {order.price}руб.
      </Typography>
    </div>
  </div>
)
