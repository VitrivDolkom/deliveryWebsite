import { SelectAddressObject } from '@/features'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { getProfileConfig, postOrderConfig } from '@/shared/api'
import { routes } from '@/shared/const'
import { useBasketContext, useUserContext } from '@/shared/lib/contexts'
import { toastOnSuccessRequest } from '@/shared/lib/helpers'
import { useRequest } from '@/shared/lib/hooks'

export const usePurchasePage = () => {
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors
  } = useForm<OrderCreateDto>()

  const [addressObjects, setAddressObjects] = React.useState<SelectAddressObject[]>([])
  const { user } = useUserContext()
  const { basket } = useBasketContext()

  const { data: profile, isLoading } = useRequest<UserDto>({
    onMount: true,
    config: getProfileConfig({ token: user.token })
  })

  const {
    isLoading: createOrderLoading,
    error: createOrderError,
    requestHandler: createOrder
  } = useRequest<never, OrderCreateDto>({
    onSuccess: () => {
      navigate(routes.orders())
      toastOnSuccessRequest()
    }
  })

  const checkLocation = () => {
    const addressId = addressObjects[addressObjects.length - 1]?.object?.address.objectGuid

    if (!addressId) {
      setError('addressId', { message: 'Выберите адрес' })
      return
    }

    clearErrors('addressId')
  }

  const onFormSubmit: SubmitHandler<OrderCreateDto> = async (deliveryInfo) => {
    const addressId = addressObjects[addressObjects.length - 1]?.object?.address.objectGuid

    if (!addressId) return

    deliveryInfo.addressId = addressId || ''
    createOrder(postOrderConfig({ dto: deliveryInfo, token: { token: user.token } }))
  }

  return {
    profile,
    isLoading,
    onFormSubmit,
    register,
    handleSubmit,
    errors,
    addressObjects,
    setAddressObjects,
    basket,
    checkLocation,
    createOrderLoading,
    createOrderError
  }
}
