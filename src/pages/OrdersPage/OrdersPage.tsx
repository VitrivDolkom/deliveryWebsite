import classNames from 'classnames/bind'
import { ToastContainer } from 'react-toastify'
import { SearchLoader } from '@/shared/components'
import { Button, Typography } from '@/shared/uikit'
import { OrderCard } from './OrderCard/OrderCard'
import { useOrdersPage } from './useOrdersPage'
import s from './styles.module.css'

const cx = classNames.bind(s)

export const OrdersPage = () => {
  const { orders, onPurchaseClick, isBasketEmpty, isLoading, onOrderConfirmClick } = useOrdersPage()

  return (
    <div className={s.wrapper}>
      <ToastContainer />
      {!isBasketEmpty && (
        <div className={cx({ block: true, top: true })}>
          <Typography tag="p" variant="t1">
            В корзине есть блюда, можно оформить заказ
          </Typography>
          <Button styleType="solid" alertType="success" className="btn" onClick={onPurchaseClick}>
            Оформить
          </Button>
        </div>
      )}
      <div className="block">
        <Typography tag="h1" variant="h1">
          Последние заказы
        </Typography>
        {isLoading && <SearchLoader />}
        <div className="block">
          {orders?.map((order) => (
            <OrderCard key={order.id} order={order} onOrderConfirmClick={onOrderConfirmClick} />
          ))}
        </div>
      </div>
    </div>
  )
}
