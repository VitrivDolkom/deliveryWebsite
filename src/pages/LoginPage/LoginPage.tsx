import { SubmitHandler, useForm } from 'react-hook-form'
import { InputBlock } from '@/shared/components'
import { Button } from '@/shared/uikit'

export const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<LoginCredentials>()

  const onFormSubmit: SubmitHandler<LoginCredentials> = async (userInfo) => {
    // api request
    console.log(userInfo)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <InputBlock
          label="Email"
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
          Войти
        </Button>
      </form>
    </div>
  )
}
