import { useNavigate } from 'react-router-dom'
import { getOrdersConfig, postOrderStatusConfig } from '@/shared/api'
import { routes } from '@/shared/const'
import { useBasketContext, useUserContext } from '@/shared/lib/contexts'
import { toastOnErrorRequest, toastOnSuccessRequest } from '@/shared/lib/helpers'
import { useRequest } from '@/shared/lib/hooks'

export const useOrdersPage = () => {
  const navigate = useNavigate()

  const { isEmpty: isBasketEmpty } = useBasketContext()
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

  const { isLoading: confirmLoading, requestHandler: confirmOrder } = useRequest<never>({
    onSuccess: () => {
      toastOnSuccessRequest('Заказ подтвержден')
      fetchOrders(getOrdersConfig({ token: { token } }))
    },
    onError: () => toastOnErrorRequest('Ошибка при подтверждении заказа')
  })

  const onOrderConfirmClick = (orderId: string) => {
    confirmOrder(postOrderStatusConfig({ id: orderId, token: { token } }))
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
    onPurchaseClick
  }
}
