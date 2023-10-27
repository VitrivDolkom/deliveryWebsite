import { AxiosError, AxiosResponse } from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { apiInstance } from '@/shared/api'
import { useUserSwitcherContext } from '@/shared/lib/contexts'

export const AxiosInterceptor = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const [isSet, setIsSet] = React.useState(false)
  const { logout } = useUserSwitcherContext()

  React.useEffect(() => {
    setIsSet(true)
    const responseInterceptor = <T, D>(response: AxiosResponse<T, D>) => response

    const errorInterceptor = <T, D>(error: AxiosError<T, D>) => {
      if (error?.response?.status === 401) {
        logout()
      }

      return Promise.reject(error)
    }

    const interceptor = apiInstance.interceptors.response.use(responseInterceptor, errorInterceptor)

    return () => apiInstance.interceptors.response.eject(interceptor)
  }, [navigate])

  return isSet && children
}
