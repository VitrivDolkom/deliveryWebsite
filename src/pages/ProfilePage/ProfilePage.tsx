import { type SelectAddressObject, SelectLocation } from '@/features'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { InputBlock } from '@/shared/components'
import { validations } from '@/shared/const'
import { GenderEnum } from '@/shared/lib/const'
import { Button, Typography } from '@/shared/uikit'

export const ProfilePage = () => {
  const [addressObjects, setAddressObjects] = React.useState<SelectAddressObject[]>([])
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch
  } = useForm<UserDto>()

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
          error={errors.fullName?.message}
          {...register('fullName', validations.birthDate)}
          ref={register('fullName', validations.birthDate).ref}
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
          label="Пол"
          blockType="row"
          constValue={GenderEnum[watch('gender')] || GenderEnum.Male}
          error={errors.email?.message}
          {...register('gender', validations.email)}
          ref={register('gender', validations.email).ref}
        />

        <InputBlock
          error={errors.phoneNumber?.message}
          {...register('phoneNumber', validations.phone)}
          type="tel"
          label="Телефон"
          ref={register('phoneNumber', validations.phone).ref}
        />

        <SelectLocation addressObjects={addressObjects} setAddressObjects={setAddressObjects} />

        <Button className="btn" styleType="solid" alertType="info">
          Обновить
        </Button>

        {/* {!!error && (
          <Typography tag="p" variant="err1">
            Ошибка изменения данных
          </Typography>
        )} */}
      </form>
    </div>
  )
}
