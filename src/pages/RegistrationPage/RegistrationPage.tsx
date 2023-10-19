import { SelectAddressObject, SelectLocation } from '@/features'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Select from 'react-select'
import { registrationRequest } from '@/shared/api'
import { ButtonLoader, InputBlock } from '@/shared/components'
import { validations } from '@/shared/const'
import { GenderEnum, genderOptions } from '@/shared/lib/const'
import { useUserSwitcherContext } from '@/shared/lib/contexts'
import { useRequest } from '@/shared/lib/hooks'
import { Button, Typography } from '@/shared/uikit'
import './styles.css'

export const RegistrationPage = () => {
  const [addressObjects, setAddressObjects] = React.useState<SelectAddressObject[]>([])
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch
  } = useForm<UserRegisterModel>()
  const {
    data: tokenResponse,
    isLoading,
    error,
    requestHandler
  } = useRequest<TokenResponse, UserRegisterModel>(false)
  const { login } = useUserSwitcherContext()

  const onFormSubmit: SubmitHandler<UserRegisterModel> = async (userInfo) => {
    const objectId = addressObjects.at(addressObjects.length - 1)?.object?.address.objectGuid
    if (!objectId) return

    userInfo.addressId = objectId
    requestHandler(registrationRequest(userInfo))
  }

  React.useEffect(() => {
    if (!tokenResponse) return

    login({ email: watch('email'), token: tokenResponse.token })
  }, [tokenResponse])

  return (
    <div>
      <Typography tag="h1" variant="h1">
        Регистрация
      </Typography>
      <form className="form" onSubmit={handleSubmit(onFormSubmit)}>
        <InputBlock
          label="ФИО"
          error={errors.fullName?.message}
          {...register('fullName', validations.birthDate)}
          ref={register('fullName', validations.birthDate).ref}
        />

        <Select
          options={genderOptions}
          value={{ label: GenderEnum[watch('gender')], value: watch('gender') }}
          onChange={(newValue) => setValue('gender', newValue?.value || 'Male')}
        />

        <InputBlock
          error={errors.phoneNumber?.message}
          {...register('phoneNumber', validations.phone)}
          type="tel"
          label="Номер телефона"
          ref={register('phoneNumber', validations.phone).ref}
        />

        <InputBlock
          label="Дата рождения"
          error={errors.birthDate?.message}
          {...register('birthDate', validations.birthDate)}
          type="date"
          ref={register('birthDate', validations.birthDate).ref}
        />

        <SelectLocation addressObjects={addressObjects} setAddressObjects={setAddressObjects} />

        <InputBlock
          label="Email (будет использоваться для входа в систему)"
          error={errors.email?.message}
          {...register('email', validations.email)}
          ref={register('email', validations.email).ref}
        />

        <InputBlock
          label="Пароль"
          type="password"
          error={errors.password?.message}
          {...register('password', validations.password)}
          ref={register('password', validations.password).ref}
        />

        <Button
          className="btn"
          styleType="solid"
          alertType="info"
          isLoading={isLoading}
          loader={<ButtonLoader />}
        >
          Зарегестрироваться
        </Button>

        {!!error && (
          <Typography tag="p" variant="err1">
            Ошибка создания пользователя
          </Typography>
        )}
      </form>
    </div>
  )
}
