import { SelectAddressObject } from '@/features'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { getProfileConfig, postOrderConfig } from '@/shared/api'
import { routes } from '@/shared/const'
import { useBasketContext, useBasketSwitcherContext, useUserContext } from '@/shared/lib/contexts'
import { toastOnErrorRequest } from '@/shared/lib/helpers'
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
  const { fetchBasket } = useBasketSwitcherContext()

  const { data: profile, isLoading } = useRequest<UserDto>({
    onMount: true,
    config: getProfileConfig({ token: user.token })
  })

  const { isLoading: createOrderLoading, requestHandler: createOrder } = useRequest<
    never,
    OrderCreateDto
  >({
    onSuccess: () => {
      fetchBasket()
      navigate(routes.orders())
    },
    onError: (error) => toastOnErrorRequest(error || 'Ошибка создания заказа'),
    onFormError: (errors) =>
      errors.forEach((error) => {
        setError(error.field, { message: error.message })
      })
  })

  const checkLocation = () => {
    const addressId = addressObjects[addressObjects.length - 1]?.object?.address.objectGuid

    if (!addressId) {
      setError('addressId', { message: 'Выберите адрес' })
      return
    }

    clearErrors('addressId')
  }

  const onFormSubmitWrapper = () => {
    checkLocation()
    handleSubmit(onFormSubmit)()
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
    register,
    errors,
    addressObjects,
    setAddressObjects,
    basket,
    checkLocation,
    createOrderLoading,
    onFormSubmitWrapper
  }
}
