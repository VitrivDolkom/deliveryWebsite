import { SelectAddressObject, SelectLocation } from '@/features'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Select from 'react-select'
import { InputBlock } from '@/shared/components'
import { GenderEnum, genderOptions } from '@/shared/lib/const'
import { Button } from '@/shared/uikit'
import s from './styles.module.css'

export const RegistrationPage = () => {
  const [addressObjects, setAddressObjects] = React.useState<SelectAddressObject[]>([])
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch
  } = useForm<UserRegisterModel>()

  const onFormSubmit: SubmitHandler<UserRegisterModel> = (userInfo) => {
    const objectId = addressObjects.at(addressObjects.length - 1)?.object?.address.objectGuid
    if (!objectId) return

    userInfo.addressId = objectId
    // do request and redirect
  }

  return (
    <div>
      <form className={s.form} onSubmit={handleSubmit(onFormSubmit)}>
        <InputBlock
          label="ФИО"
          error={errors.fullName?.message}
          {...register('fullName', { required: { value: true, message: 'Заполните поле' } })}
          ref={register('fullName', { required: { value: true, message: 'Заполните поле' } }).ref}
        />

        <Select
          options={genderOptions}
          value={{ label: GenderEnum[watch('gender')], value: watch('gender') }}
          onChange={(newValue) => setValue('gender', newValue?.value || 'Male')}
        />

        <InputBlock
          error={errors.phoneNumber?.message}
          {...register('phoneNumber', {
            required: { value: true, message: 'Заполните поле' }
          })}
          type="tel"
          label="Номер телефона"
          ref={
            register('phoneNumber', {
              required: { value: true, message: 'Заполните поле' }
            }).ref
          }
        />
        <InputBlock
          label="Дата рождения"
          error={errors.birthDate?.message}
          {...register('birthDate', { required: { value: true, message: 'Заполните поле' } })}
          type="date"
          ref={register('birthDate', { required: { value: true, message: 'Заполните поле' } }).ref}
        />

        <SelectLocation addressObjects={addressObjects} setAddressObjects={setAddressObjects} />

        <InputBlock
          label="Email (будет использоваться для входа в систему)"
          error={errors.email?.message}
          {...register('email', { required: { value: true, message: 'Заполните поле' } })}
          ref={register('email', { required: { value: true, message: 'Заполните поле' } }).ref}
        />
        <InputBlock
          label="Пароль"
          type="password"
          error={errors.password?.message}
          {...register('password', { required: { value: true, message: 'Заполните поле' } })}
          ref={register('password', { required: { value: true, message: 'Заполните поле' } }).ref}
        />
        <Button styleType="solid" alertType="info">
          Зарегестрироваться
        </Button>
      </form>
    </div>
  )
}
