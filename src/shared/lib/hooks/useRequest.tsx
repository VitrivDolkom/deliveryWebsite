import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import React from 'react'
import { statusCodeErrors } from '../const'

interface UseRequestParams<D> {
  onMount?: boolean
  config?: AxiosRequestConfig<D>
  duration?: number
}

export const useRequest = <T, D = never>({
  onMount = false,
  config = {},
  duration = 0
}: UseRequestParams<D>) => {
  const [data, setData] = React.useState<T | null>(null)
  const [error, setError] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [statusCode, setStatusCode] = React.useState<number | null>(null)

  const requestHandler = React.useCallback(async (config: AxiosRequestConfig<D>) => {
    setIsSuccess(false)
    setIsLoading(true)
    setError('')

    try {
      const response = await axios(config)
      setStatusCode(response.status)

      if (response.status >= 300) {
        throw new Error('Something went Wrong')
      }

      if (response.data) {
        setData(response.data)
      } else {
        setData(null)
      }

      setIsSuccess(true)
    } catch (catchReason: unknown) {
      const reason = catchReason as AxiosError<Response>
      const errorMessage = reason.response?.data.message

      if (!!errorMessage) {
        setError(errorMessage)
        return
      }

      const statusCode = reason.response?.status || ''
      setError(statusCodeErrors[statusCode])
    }

    setTimeout(() => {
      setIsLoading(false)
    }, duration)
  }, [])

  React.useEffect(() => {
    if (onMount && config) {
      requestHandler(config)
    }
  }, [])

  return {
    data,
    error,
    isLoading,
    isSuccess,
    statusCode,
    requestHandler
  }
}
