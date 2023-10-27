import { router } from '@/app/router'
import axios, { AxiosRequestConfig } from 'axios'

interface RequestParams<T> {
  config: AxiosRequestConfig<T>
  url: string
}

export const config = <T>({ config, url }: RequestParams<T>): AxiosRequestConfig<T> => ({
  ...config,
  url: `${import.meta.env.VITE_BACKEND_URL}${url}`
})

axios.interceptors.response.use(
  (response) => response,
  function (error) {
    if (error.response.status === 401) {
      router.navigate('/login')
      return Promise.reject(error)
    }

    return Promise.reject(error)
  }
)
