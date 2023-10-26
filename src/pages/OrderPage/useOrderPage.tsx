/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useParams } from 'react-router-dom'
import { getAddressChainConfig, getOrderConfig, postOrderStatusConfig } from '@/shared/api'
import { useUserContext } from '@/shared/lib/contexts'
import { useRequest } from '@/shared/lib/hooks'

export const useOrderPage = () => {
  const { id } = useParams()

  const {
    user: { token }
  } = useUserContext()

  const {
    data: order,
    isLoading,
    error,
    requestHandler: fetchOrder
  } = useRequest<OrderDto>({
    onMount: true,
    config: getOrderConfig({ id: id || '', token: { token } })
  })

  const {
    data: addressChain,
    isLoading: addressLoading,
    error: addressError,
    requestHandler: fetchAddressChain
  } = useRequest<SearchAddressModel[]>({})

  const {
    isLoading: confirmLoading,
    error: confirmError,
    requestHandler: confirmOrder
  } = useRequest<never>({})

  React.useEffect(() => {
    if (!!order) {
      fetchAddressChain(getAddressChainConfig({ objectGuid: order.address }))
    }
  }, [order])

  const onOrderConfirmClick = () => {
    confirmOrder(postOrderStatusConfig({ id: id || '', token: { token } }))
    // todo on success
    // fetchOrder(getOrderConfig({ id: orderId, token: { token } }))
  }

  return {
    order,
    confirmLoading,
    confirmError,
    onOrderConfirmClick,
    isLoading,
    error,
    addressChain,
    addressLoading
  }
}
