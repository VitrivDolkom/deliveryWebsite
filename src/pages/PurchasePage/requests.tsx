/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { getOrdersConfig } from '@/shared/api'
import { useUserContext } from '@/shared/lib/contexts'
import { useRequest } from '@/shared/lib/hooks'

export const useRequests = () => {
  const { user } = useUserContext()

  const {
    data: orders,
    isLoading,
    error
  } = useRequest<OrderDto[]>({
    onMount: true,
    config: getOrdersConfig({ token: { token: user.token } })
  })

  const {
    isLoading: createOrderLoading,
    error: createOrderError,
    requestHandler: createOrder
  } = useRequest<never, OrderCreateDto>({})

  const {
    isLoading: confirmOrderLoading,
    error: confirmOrderError,
    requestHandler: confirmOrder
  } = useRequest<never>({})

  React.useEffect(() => {
    // createOrder(postOrderConfig({ dto: {}, token: { token: user.token } }))
    // confirmOrder(postOrderStatusConfig({ id: '', dto: {}, token: { token: user.token } }))
  }, [])

  return {
    orders,
    isLoading,
    error,
    createOrderLoading,
    confirmOrderLoading,
    createOrderError,
    confirmOrderError
  }
}
