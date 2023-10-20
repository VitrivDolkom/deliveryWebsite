import { selectAddressFromSearchModel, SelectAddressObject } from '@/features'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { getAddressChainConfig, getProfileConfig } from '@/shared/api'
import { useUserContext } from '@/shared/lib/contexts'
import { getDateFromDateTime } from '@/shared/lib/helpers'
import { useRequest } from '@/shared/lib/hooks'

export const useProfile = () => {
  const [addressObjects, setAddressObjects] = React.useState<SelectAddressObject[]>([])
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset
  } = useForm<UserDto>()
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

    setAddressObjects(addressChain.map((address) => selectAddressFromSearchModel([address], true)))
  }, [addressChain])

  const onFormSubmit: SubmitHandler<UserDto> = async (userInfo) => {
    console.log(userInfo)
  }

  return {
    handleSubmit,
    onFormSubmit,
    addressChain,
    addressLoading,
    userInfo,
    isLoading,
    error,
    register,
    watch,
    errors,
    addressObjects,
    setAddressObjects
  }
}
