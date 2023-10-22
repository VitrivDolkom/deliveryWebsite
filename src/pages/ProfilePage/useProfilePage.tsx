import { SelectAddressObject, selectAddressObjectFromSearchModel } from '@/features'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { getAddressChainConfig, getProfileConfig, putProfileConfig } from '@/shared/api'
import { useUserContext } from '@/shared/lib/contexts'
import { getDateFromDateTime } from '@/shared/lib/helpers'
import { useRequest } from '@/shared/lib/hooks'

export const useProfilePage = () => {
  const [addressObjects, setAddressObjects] = React.useState<SelectAddressObject[]>([])
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset
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
  } = useRequest<SearchAddressModel[]>({})

  const {
    isLoading: updateProfileLoading,
    error: updateProfileError,
    requestHandler: updateProfile
  } = useRequest<Response, UserEditModel>({})

  React.useEffect(() => {
    if (!userInfo) return

    const formUserInfo: UserEditModel = {
      birthDate: userInfo.birthDate,
      fullName: userInfo.fullName,
      gender: userInfo.gender,
      phoneNumber: userInfo.phoneNumber,
      addressId: userInfo.address
    }

    fetchAddressChain(getAddressChainConfig({ objectGuid: userInfo.address }))
    reset({ ...formUserInfo, birthDate: getDateFromDateTime(userInfo.birthDate) })
  }, [userInfo])

  React.useEffect(() => {
    if (!addressChain) return

    setAddressObjects(addressChain.map((address) => selectAddressObjectFromSearchModel([address], true)))
  }, [addressChain])

  const onFormSubmit: SubmitHandler<UserEditModel> = async (userInfo) => {
    const objectId = addressObjects.at(addressObjects.length - 1)?.object?.address.objectGuid
    if (!objectId) {
      return
    }

    userInfo.addressId = objectId
    updateProfile(putProfileConfig(userInfo, { token: user.token }))
  }

  return {
    handleSubmit,
    addressChain,
    addressLoading,
    updateProfileLoading,
    updateProfileError,
    userInfo,
    isLoading,
    error,
    register,
    watch,
    onFormSubmit,
    errors,
    addressObjects,
    setAddressObjects
  }
}
