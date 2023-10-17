import { useCallback, useEffect, useState } from 'react'

interface RequestConfig {
  headers: HeadersInit | undefined
  method: 'get' | 'put' | 'delete' | 'post'
  body?: Record<string, string>
  url: string
}

export const useRequest = <T,>(onMount: boolean = false, configData?: RequestConfig) => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const requestHandler = useCallback(async (configData: RequestConfig) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(configData.url, {
        method: configData.method,
        body: configData.body ? JSON.stringify(configData.body) : null,
        headers: configData.headers
      })

      if (!response.ok) {
        throw new Error('Something went Wrong')
      }

      const result = await response.json()
      setData(result)
    } catch (error: unknown) {
      setError((error as Response).message || '')
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (onMount && configData) {
      requestHandler(configData)
    }
  }, [])

  return {
    data,
    error,
    isLoading,
    requestHandler
  }
}
