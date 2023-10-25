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
    handleSubmit
  } = useForm<OrderCreateDto>()

  const [addressObjects, setAddressObjects] = React.useState<SelectAddressObject[]>([])
  const { user } = useUserContext()
  const { basket } = useBasketContext()

  const { data: profile, isLoading } = useRequest<UserDto>({
    onMount: true,
    config: getProfileConfig({ token: user.token })
  })

  // const { requestHandler: createOrder } = useRequest<UserDto>({})

  const onFormSubmit: SubmitHandler<OrderCreateDto> = async (data) => {
    // createOrder(postOrderConfig({ token: user.token, ...data }))
    console.log(data)
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
    basket
  }
}
