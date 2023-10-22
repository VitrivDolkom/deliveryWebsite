import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { postLoginConfig } from '@/shared/api'
import { useUserSwitcherContext } from '@/shared/lib/contexts'
import { useRequest } from '@/shared/lib/hooks'

export const useLoginPage = () => {
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
  } = useRequest<TokenResponse, LoginCredentials>({})

  const onFormSubmit: SubmitHandler<LoginCredentials> = async (userInfo) => {
    requestHandler(postLoginConfig(userInfo))
  }

  React.useEffect(() => {
    if (!tokenResponse) return

    login({ email: watch('email'), token: tokenResponse.token })
  }, [tokenResponse])

  return { handleSubmit, onFormSubmit, register, errors, isLoading }
}
