import { ToastContainer } from 'react-toastify'
import { ButtonLoader, InputBlock } from '@/shared/components'
import { validations } from '@/shared/const'
import { Button } from '@/shared/uikit'
import { useLoginPage } from './useLoginPage'

export const LoginPage = () => {
  const { errors, handleSubmit, isLoading, onFormSubmit, register } = useLoginPage()

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <InputBlock
          label="Email"
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
          Войти
        </Button>
      </form>
    </div>
  )
}
