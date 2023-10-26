import classNames from 'classnames/bind'
import { useNavigate } from 'react-router-dom'
import { routes } from '@/shared/const'
import { Button, Typography } from '@/shared/uikit'
import { OrderCard } from './OrderCard/OrderCard'
import s from './styles.module.css'

const cx = classNames.bind(s)

const orders: OrderInfoDto[] = [
  {
    deliveryTime: '2024-10-10T10:10:00',
    orderTime: '2023-10-25T09:54:16.0866595',
    status: 'InProcess',
    price: 1550,
    id: 'ebcb8b1b-eb52-4ce1-e0e0-08dbd5405992'
  }
]

export const OrdersPage = () => {
  const navigate = useNavigate()

  return (
    <div className={s.wrapper}>
      <div className={cx({ block: true, top: true })}>
        <Typography tag="p" variant="t1">
          В корзине есть блюда, можно оформить заказ
        </Typography>
        <Button
          styleType="solid"
          alertType="success"
          className="btn"
          onClick={() => navigate(routes.purchase())}
        >
          Оформить
        </Button>
      </div>
      <div className="block">
        <Typography tag="h1" variant="h1">
          Последние заказы
        </Typography>
        <div className="block">
          {orders.map((order) => (
            <OrderCard order={order} />
          ))}
        </div>
      </div>
    </div>
  )
}
