/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from 'react-router-dom'
import { getOrderConfig, postOrderStatusConfig } from '@/shared/api'
import { useUserContext } from '@/shared/lib/contexts'
import { useRequest } from '@/shared/lib/hooks'

export const useOrderPage = () => {
  const { id } = useParams()

  const {
    user: { token }
  } = useUserContext()

  const {
    isLoading,
    error,
    requestHandler: fetchOrder
  } = useRequest<OrderDto>({
    onMount: true,
    config: getOrderConfig({ id: id || '', token: { token } })
  })

  const {
    isLoading: confirmLoading,
    error: confirmError,
    requestHandler: confirmOrder
  } = useRequest<never>({})

  const onOrderConfirmClick = (orderId: string) => {
    confirmOrder(postOrderStatusConfig({ id: orderId, token: { token } }))
    // todo on success
    // fetchOrder(getOrderConfig({ id: orderId, token: { token } }))
  }

  return { confirmLoading, confirmError, onOrderConfirmClick, isLoading, error }
}
