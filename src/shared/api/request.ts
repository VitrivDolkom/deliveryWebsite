import { AxiosRequestConfig } from 'axios'

interface RequestParams<T> {
  config: AxiosRequestConfig<T>
  url: string
}

export const request = <T>({ config, url }: RequestParams<T>): AxiosRequestConfig<T> => ({
  ...config,
  url: `${import.meta.env.VITE_BACKEND_URL}${url}`
})
