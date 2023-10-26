import classNames from 'classnames/bind'
import { DishBasketCard } from '@/shared/components'
import { OrderStatusEnum } from '@/shared/const'
import { getDateFromDateTime, getTimeFromDateTime } from '@/shared/lib/helpers'
import { Button, Typography } from '@/shared/uikit'
import s from './styles.module.css'

const cx = classNames.bind(s)

const order: OrderDto = {
  dishes: [
    {
      name: 'Wok а-ля Диаблo',
      price: 330,
      totalPrice: 1320,
      amount: 4,
      image: 'https://mistertako.ru/uploads/products/663ab868-85ec-11ea-a9ab-86b1f8341741.jpg',
      id: '3b690ced-a766-451c-273c-08dbc899a338'
    }
  ],
  address: 'f207e9ed-a2c1-4f78-a893-cbc3287114af',
  deliveryTime: '2023-12-10T10:12:00',
  orderTime: '2023-10-26T02:44:59.3113578',
  status: 'Delivered',
  price: 1320,
  id: 'f662b687-47cc-49ff-e6a9-08dbd5cb798c'
}

export const OrderPage = () => (
  <div>
    <div className={s.top}>
      <Typography tag="h1" variant="t6">
        Заказ #3234
      </Typography>
      <Button styleType="outlined" alertType="success" className="btn big">
        Подтвердить доставку
      </Button>
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
        Адрес доставки: {order.address}
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
