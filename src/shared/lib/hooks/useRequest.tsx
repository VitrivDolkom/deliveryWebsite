import axios, { AxiosRequestConfig } from 'axios'
import { useCallback, useEffect, useState } from 'react'

export const useRequest = <T,>(onMount: boolean = false, config?: AxiosRequestConfig<T>) => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const requestHandler = useCallback(async (config: AxiosRequestConfig<T>) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await axios(config)

      if (response.status >= 300) {
        throw new Error('Something went Wrong')
      }

      setData(response.data)
    } catch (error: unknown) {
      setError((error as Response).message || '')
    }
    setIsLoading(false)
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
    requestHandler
  }
}
