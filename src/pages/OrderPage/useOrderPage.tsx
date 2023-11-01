import { useParams } from 'react-router-dom'
import { getAddressChainConfig, getOrderConfig, postOrderStatusConfig } from '@/shared/api'
import { useUserContext } from '@/shared/lib/contexts'
import { toastOnErrorRequest, toastOnSuccessRequest } from '@/shared/lib/helpers'
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
    duration: 500,
    config: getOrderConfig({ id: id || '', token: { token } }),
    onSuccess: (order) => fetchAddressChain(getAddressChainConfig({ objectGuid: order!.address }))
  })

  const {
    data: addressChain,
    isLoading: addressLoading,
    requestHandler: fetchAddressChain
  } = useRequest<SearchAddressModel[]>({})

  const { isLoading: confirmLoading, requestHandler: confirmOrder } = useRequest<never>({
    onSuccess: () => {
      toastOnSuccessRequest('Заказ подтвержден')
      fetchOrder(getOrderConfig({ id: id || '', token: { token } }))
    },
    onError: () => toastOnErrorRequest('Ошибка при подтверждении заказа')
  })

  const onOrderConfirmClick = () => {
    confirmOrder(postOrderStatusConfig({ id: id || '', token: { token } }))
  }

  return {
    order,
    confirmLoading,
    onOrderConfirmClick,
    isLoading,
    error,
    addressChain,
    addressLoading
  }
}
