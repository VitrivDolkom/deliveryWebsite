import { SelectAddressObject } from '@/features'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { postRegisterConfig } from '@/shared/api'
import { routes } from '@/shared/const'
import { useUserSwitcherContext } from '@/shared/lib/contexts'
import { useRequest } from '@/shared/lib/hooks'

export const useRegistrationPage = () => {
  const navigate = useNavigate()
  const [addressObjects, setAddressObjects] = React.useState<SelectAddressObject[]>([])
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
    setError,
    clearErrors
  } = useForm<UserRegisterModel>()

  const {
    data: tokenResponse,
    isLoading,
    error,
    requestHandler: registration
  } = useRequest<TokenResponse, UserRegisterModel>({ onSuccess: () => navigate(routes.root()) })

  const { login } = useUserSwitcherContext()

  const checkLocation = () => {
    const addressId = addressObjects[addressObjects.length - 1]?.object?.address.objectGuid

    if (!addressId) {
      setError('addressId', { message: 'Выберите адрес' })
      return
    }

    clearErrors('addressId')
  }

  const onFormSubmitWrapper = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    checkLocation()
    handleSubmit(onFormSubmit)()
  }

  const onFormSubmit: SubmitHandler<UserRegisterModel> = async (userInfo) => {
    const objectId = addressObjects.at(addressObjects.length - 1)?.object?.address.objectGuid

    if (!objectId) return

    userInfo.addressId = objectId
    registration(postRegisterConfig(userInfo))
  }

  React.useEffect(() => {
    if (!tokenResponse) return

    login({ email: watch('email'), token: tokenResponse.token })
  }, [tokenResponse])

  return {
    setAddressObjects,
    addressObjects,
    register,
    errors,
    setValue,
    isLoading,
    error,
    watch,
    onFormSubmitWrapper
  }
}
