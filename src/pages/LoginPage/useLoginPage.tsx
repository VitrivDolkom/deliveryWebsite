import { postLoginConfig } from '@/shared/api'
import { routes } from '@/shared/const'
import { useUserContext, useUserSwitcherContext } from '@/shared/lib/contexts'
import { toastOnErrorRequest } from '@/shared/lib/helpers'
import { useRequest } from '@/shared/lib/hooks'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

export const useLoginPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch
  } = useForm<LoginCredentials>()

  const { isAuth } = useUserContext()
  const { login, logout } = useUserSwitcherContext()

  const { isLoading, requestHandler } = useRequest<TokenResponse, LoginCredentials>({
    onSuccess: (tokenResponse) => login({ email: watch('email'), token: tokenResponse!.token }),
    onError: (error) => {
      toastOnErrorRequest(error || 'Ошибка входа в аккаунт')
    }
  })

  React.useEffect(() => {
    logout()
  }, [])

  React.useEffect(() => {
    if(!isAuth) return;

    if (!!location.state?.from) {
      navigate(location.state.from)
    } else {
      navigate(routes.root())
    }

  }, [isAuth])

  const onFormSubmit: SubmitHandler<LoginCredentials> = async (userInfo) => {
    requestHandler(postLoginConfig(userInfo))
  }

  return { handleSubmit, onFormSubmit, register, errors, isLoading }
}
