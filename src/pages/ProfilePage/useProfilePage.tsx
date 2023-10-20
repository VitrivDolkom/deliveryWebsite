import { SelectAddressObject, selectAddressObjectFromSearchModel } from '@/features'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { getAddressChainConfig, getProfileConfig } from '@/shared/api'
import { useUserContext } from '@/shared/lib/contexts'
import { getDateFromDateTime } from '@/shared/lib/helpers'
import { useRequest } from '@/shared/lib/hooks'

type UserProfile = Omit<UserDto, 'id'>

export const useProfilePage = () => {
  const [addressObjects, setAddressObjects] = React.useState<SelectAddressObject[]>([])
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset
  } = useForm<UserProfile>()
  const { user } = useUserContext()
  const {
    data: userInfo,
    isLoading,
    error
  } = useRequest<UserDto>(true, getProfileConfig({ token: user.token }))

  const {
    data: addressChain,
    isLoading: addressLoading,
    requestHandler: fetchAddressChain
  } = useRequest<SearchAddressModel[]>(false)

  React.useEffect(() => {
    if (!userInfo) return

    fetchAddressChain(getAddressChainConfig({ objectGuid: userInfo.address }))
    reset({ ...userInfo, birthDate: getDateFromDateTime(userInfo.birthDate) })
  }, [userInfo])

  React.useEffect(() => {
    if (!addressChain) return

    setAddressObjects(addressChain.map((address) => selectAddressObjectFromSearchModel([address], true)))
  }, [addressChain])

  const onFormSubmit: SubmitHandler<UserProfile> = async (userInfo) => {
    console.log(userInfo)
  }

  return {
    handleSubmit,
    addressChain,
    addressLoading,
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
