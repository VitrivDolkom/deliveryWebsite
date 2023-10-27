import { SubmitHandler, useForm } from 'react-hook-form'
import { postLoginConfig } from '@/shared/api'
import { useUserSwitcherContext } from '@/shared/lib/contexts'
import { toastOnErrorRequest } from '@/shared/lib/helpers'
import { useRequest } from '@/shared/lib/hooks'

export const useLoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch
  } = useForm<LoginCredentials>()

  const { login } = useUserSwitcherContext()

  const { isLoading, requestHandler } = useRequest<TokenResponse, LoginCredentials>({
    onSuccess: (tokenResponse) => login({ email: watch('email'), token: tokenResponse!.token }),
    onError: (error) => {
      toastOnErrorRequest(error || 'Ошибка входа в аккаунт')
    }
  })

  const onFormSubmit: SubmitHandler<LoginCredentials> = async (userInfo) => {
    requestHandler(postLoginConfig(userInfo))
  }

  return { handleSubmit, onFormSubmit, register, errors, isLoading }
}
