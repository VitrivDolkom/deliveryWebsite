import { OrderStatusEnum } from '@/shared/const'
import { getDateFromDateTime, getTimeFromDateTime } from '@/shared/lib/helpers'
import { Button, Typography } from '@/shared/uikit'
import s from './styles.module.css'

interface OrderCardProps {
  order: OrderInfoDto
}

export const OrderCard = ({ order }: OrderCardProps) => (
  <div className={s.card}>
    <div className={s.left}>
      <Typography tag="p" variant="t4">
        Заказ от {getDateFromDateTime(order.orderTime)}
      </Typography>

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
        <Button styleType="outlined" alertType="success" className="btn big">
          Подтвердить доставку
        </Button>
      )}

      <Typography tag="p" variant="t4">
        Стоимость заказа: {order.price}руб.
      </Typography>
    </div>
  </div>
)
