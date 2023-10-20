import { selectAddressFromSearchModel, type SelectAddressObject, SelectLocation } from '@/features'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { getAddressChainConfig, getProfileConfig } from '@/shared/api'
import { ButtonLoader, InputBlock } from '@/shared/components'
import { validations } from '@/shared/const'
import { GenderEnum } from '@/shared/lib/const'
import { useUserContext } from '@/shared/lib/contexts'
import { getDateFromDateTime } from '@/shared/lib/helpers'
import { useRequest } from '@/shared/lib/hooks'
import { Button, Typography } from '@/shared/uikit'

export const ProfilePage = () => {
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

  return (
    <div>
      <Typography tag="h1" variant="h1">
        Профиль
      </Typography>
      <form className="form" onSubmit={handleSubmit(onFormSubmit)}>
        <InputBlock
          label="ФИО"
          blockType="row"
          error={errors.fullName?.message}
          {...register('fullName', validations.fullName)}
          ref={register('fullName', validations.fullName).ref}
        />

        <InputBlock
          label="Email"
          constValue={watch('email')}
          blockType="row"
          error={errors.email?.message}
          {...register('email', validations.email)}
          ref={register('email', validations.email).ref}
        />

        <InputBlock
          label="Дата рождения"
          blockType="row"
          type="date"
          error={errors.birthDate?.message}
          {...register('birthDate', validations.birthDate)}
          ref={register('birthDate', validations.birthDate).ref}
        />

        <InputBlock
          label="Пол"
          blockType="row"
          constValue={GenderEnum[watch('gender')] || GenderEnum.Male}
          error={errors.email?.message}
          {...register('gender', validations.email)}
          ref={register('gender', validations.email).ref}
        />

        <InputBlock
          label="Телефон"
          type="tel"
          blockType="row"
          error={errors.phoneNumber?.message}
          {...register('phoneNumber', validations.phone)}
          ref={register('phoneNumber', validations.phone).ref}
        />

        <SelectLocation addressObjects={addressObjects} setAddressObjects={setAddressObjects} />

        <Button
          className="btn"
          styleType="solid"
          alertType="info"
          isLoading={isLoading || addressLoading}
          loader={<ButtonLoader />}
        >
          Обновить
        </Button>

        {!!error && (
          <Typography tag="p" variant="err1">
            Ошибка изменения данных
          </Typography>
        )}
      </form>
    </div>
  )
}
