import { SelectAddressObject, selectAddressObjectFromSearchModel } from '@/features'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { getAddressChainConfig, getProfileConfig, putProfileConfig } from '@/shared/api'
import { useUserContext } from '@/shared/lib/contexts'
import { getDateFromDateTime, toastOnErrorRequest, toastOnSuccessRequest } from '@/shared/lib/helpers'
import { useRequest } from '@/shared/lib/hooks'

export const useProfilePage = () => {
  const [addressObjects, setAddressObjects] = React.useState<SelectAddressObject[]>([])
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
    setError,
    clearErrors
  } = useForm<UserEditModel>()

  const { user } = useUserContext()

  const {
    data: userInfo,
    isLoading,
    error
  } = useRequest<UserDto>({ onMount: true, config: getProfileConfig({ token: user.token }) })

  const {
    data: addressChain,
    isLoading: addressLoading,
    requestHandler: fetchAddressChain
  } = useRequest<SearchAddressModel[]>({
    onSuccess: (addressChain) =>
      setAddressObjects(
        addressChain!.map((address) => selectAddressObjectFromSearchModel([address], true))
      )
  })

  const {
    isLoading: updateProfileLoading,
    error: updateProfileError,
    requestHandler: updateProfile
  } = useRequest<Response, UserEditModel>({
    onSuccess: () => toastOnSuccessRequest(),
    onError: (error) => toastOnErrorRequest(error || 'Ошибка обновления профиля'),
    onFormError: (errors) =>
      errors.forEach((error) => {
        setError(error.field, { message: error.message })
      })
  })

  React.useEffect(() => {
    if (!userInfo) return

    const formUserInfo: UserEditModel = {
      birthDate: userInfo.birthDate,
      fullName: userInfo.fullName,
      gender: userInfo.gender,
      phoneNumber: userInfo.phoneNumber,
      addressId: userInfo.address
    }

    // если пришли данные о пользователе из профиля, то запрашиваем адрес
    // и заполняем форму данными о пользователе
    fetchAddressChain(getAddressChainConfig({ objectGuid: userInfo.address }))
    reset({ ...formUserInfo, birthDate: getDateFromDateTime(userInfo.birthDate) })
  }, [userInfo])

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

  const onFormSubmit: SubmitHandler<UserEditModel> = async (userInfo) => {
    const objectId = addressObjects[addressObjects.length - 1]?.object?.address.objectGuid
    if (!objectId) return

    userInfo.addressId = objectId
    updateProfile(putProfileConfig(userInfo, { token: user.token }))
  }

  return {
    addressChain,
    addressLoading,
    updateProfileLoading,
    updateProfileError,
    userInfo,
    isLoading,
    error,
    register,
    watch,
    errors,
    addressObjects,
    setAddressObjects,
    onFormSubmitWrapper
  }
}
