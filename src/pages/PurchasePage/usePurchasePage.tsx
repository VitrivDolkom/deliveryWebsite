import { SelectAddressObject } from '@/features'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { getProfileConfig } from '@/shared/api'
import { useBasketContext, useUserContext } from '@/shared/lib/contexts'
import { useRequest } from '@/shared/lib/hooks'

export const usePurchasePage = () => {
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

  // const { requestHandler: createOrder } = useRequest<UserDto>({})

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
    console.log(deliveryInfo)
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
    checkLocation
  }
}
