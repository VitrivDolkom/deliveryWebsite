import { SelectAddressObject } from '@/features'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { postRegisterConfig } from '@/shared/api'
import { routes } from '@/shared/const'
import { useUserSwitcherContext } from '@/shared/lib/contexts'
import { toastOnErrorRequest } from '@/shared/lib/helpers'
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

  const { login } = useUserSwitcherContext()

  const {
    isLoading,
    error,
    requestHandler: registration
  } = useRequest<TokenResponse, UserRegisterModel>({
    onSuccess: (tokenResponse) => {
      login({ email: watch('email'), token: tokenResponse!.token })
      navigate(routes.root())
    },
    onError: (error) => toastOnErrorRequest(error || 'Ошибка регистрации')
  })

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
    const objectId = addressObjects[addressObjects.length - 1]?.object?.address.objectGuid

    if (!objectId) return

    userInfo.addressId = objectId
    registration(postRegisterConfig(userInfo))
  }

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
