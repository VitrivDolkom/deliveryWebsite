import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { loginRequest } from '@/shared/api'
import { InputBlock } from '@/shared/components'
import { validations } from '@/shared/const'
import { useUserSwitcherContext } from '@/shared/lib/contexts'
import { useRequest } from '@/shared/lib/hooks'
import { Button } from '@/shared/uikit'

export const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch
  } = useForm<LoginCredentials>()
  const { login } = useUserSwitcherContext()
  const {
    data: tokenResponse,
    isLoading,
    requestHandler
  } = useRequest<TokenResponse, LoginCredentials>(false)

  const onFormSubmit: SubmitHandler<LoginCredentials> = async (userInfo) => {
    requestHandler(loginRequest(userInfo))
  }

  React.useEffect(() => {
    if (!tokenResponse) return

    login({ email: watch('email'), token: tokenResponse.token })
  }, [tokenResponse])

  return (
    <div>
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

        <Button className="btn" styleType="solid" alertType="info" isLoading={isLoading}>
          Войти
        </Button>
      </form>
    </div>
  )
}
