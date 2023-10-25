import { SelectAddressObject } from '@/features'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { postRegisterConfig } from '@/shared/api'
import { useUserSwitcherContext } from '@/shared/lib/contexts'
import { useRequest } from '@/shared/lib/hooks'

export const useRegistrationPage = () => {
  const [addressObjects, setAddressObjects] = React.useState<SelectAddressObject[]>([])
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
    setError
  } = useForm<UserRegisterModel>()

  const {
    data: tokenResponse,
    isLoading,
    error,
    requestHandler
  } = useRequest<TokenResponse, UserRegisterModel>({})

  const { login } = useUserSwitcherContext()

  const onFormSubmit: SubmitHandler<UserRegisterModel> = async (userInfo) => {
    const objectId = addressObjects.at(addressObjects.length - 1)?.object?.address.objectGuid
    if (!objectId) {
      setError('addressId', { message: 'Выберите адрес' })
      return
    }

    userInfo.addressId = objectId
    requestHandler(postRegisterConfig(userInfo))
  }

  React.useEffect(() => {
    if (!tokenResponse) return

    login({ email: watch('email'), token: tokenResponse.token })
  }, [tokenResponse])

  return {
    setAddressObjects,
    addressObjects,
    handleSubmit,
    onFormSubmit,
    register,
    errors,
    setValue,
    isLoading,
    error,
    watch
  }
}
