import axios, { AxiosRequestConfig } from 'axios'
import { useCallback, useEffect, useState } from 'react'

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
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const requestHandler = useCallback(async (config: AxiosRequestConfig<D>) => {
    setIsLoading(true)
    setError('')
    setIsSuccess(false)

    try {
      const response = await axios(config)

      if (response.status >= 300) {
        throw new Error('Something went Wrong')
      }

      setData(response.data)
      setIsSuccess(true)
    } catch (error: unknown) {
      setError((error as Response).message || '')
    }

    setTimeout(() => {
      setIsLoading(false)
    }, duration)
  }, [])

  useEffect(() => {
    if (onMount && config) {
      requestHandler(config)
    }
  }, [])

  return {
    data,
    error,
    isLoading,
    requestHandler,
    isSuccess
  }
}
