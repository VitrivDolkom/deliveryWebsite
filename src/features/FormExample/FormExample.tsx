import { SubmitHandler, useForm } from 'react-hook-form'
import { InputBlock } from '@/shared/components'
import { Button, Select, Typography } from '@/shared/uikit'

enum GenderEnum {
  Male = 'Мужчина',
  Female = 'Женщина'
}

const genderOptions = [
  { label: 'Мужчина', value: 'Male' },
  { label: 'Женщина', value: 'Female' }
]

export const FormExample = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<UserRegisterModel>()

  const onFormSubmit: SubmitHandler<UserRegisterModel> = (userInfo) => {
    console.log(userInfo)
  }

  return (
    <div className="">
      <Typography tag="h1" variant="h1">
        Регистрация нового пользователя
      </Typography>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <InputBlock
          label="ФИО"
          error={errors.fullName?.message}
          {...register('fullName', { required: { value: true, message: 'Заполните поле' } })}
          ref={register('fullName', { required: { value: true, message: 'Заполните поле' } }).ref}
        />

        <Select
          options={genderOptions}
          value={{ label: GenderEnum[watch('gender')], value: watch('gender') }}
          onChange={(newValue) => setValue('gender', (newValue?.value || 'Male') as Gender)}
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

        <Button styleType="solid" alertType="info">
          <Typography tag="p" variant="btn1">
            Зарегестрироваться
          </Typography>
        </Button>
      </form>
    </div>
  )
}
