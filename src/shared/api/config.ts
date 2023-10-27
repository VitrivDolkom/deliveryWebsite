import { AxiosRequestConfig } from 'axios'

interface RequestParams<T> {
  config: AxiosRequestConfig<T>
  url: string
}

export const config = <T>({ config, url }: RequestParams<T>): AxiosRequestConfig<T> => ({
  ...config,
  url: url
})
