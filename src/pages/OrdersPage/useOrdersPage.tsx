/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from 'react-router-dom'
import { getOrdersConfig, postOrderStatusConfig } from '@/shared/api'
import { routes } from '@/shared/const'
import { useBasketContext, useBasketSwitcherContext, useUserContext } from '@/shared/lib/contexts'
import { useRequest } from '@/shared/lib/hooks'

export const useOrdersPage = () => {
  const navigate = useNavigate()

  const { isEmpty: isBasketEmpty } = useBasketContext()
  const { fetchBasket } = useBasketSwitcherContext()
  const {
    user: { token }
  } = useUserContext()

  const {
    data: orders,
    isLoading,
    error,
    requestHandler: fetchOrders
  } = useRequest<OrderInfoDto[]>({
    onMount: true,
    config: getOrdersConfig({ token: { token } }),
    duration: 700
  })

  const {
    isLoading: confirmLoading,
    error: confirmError,
    requestHandler: confirmOrder
  } = useRequest<never>({})

  const onOrderConfirmClick = (orderId: string) => {
    confirmOrder(postOrderStatusConfig({ id: orderId, token: { token } }))
    // todo on success
    // fetchOrders(getOrdersConfig({ token: { token } }))
    // fetchBasket()
  }

  const onPurchaseClick = () => {
    navigate(routes.purchase())
  }

  return {
    isBasketEmpty,
    orders,
    isLoading,
    error,
    onOrderConfirmClick,
    confirmLoading,
    confirmError,
    onPurchaseClick
  }
}
