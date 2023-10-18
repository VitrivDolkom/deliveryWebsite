import { request } from '@/shared/api'

interface AddressSearchRequestParams {
  parentObjectId?: number
  query?: string
}

export const addressSearchRequest = ({ parentObjectId, query }: AddressSearchRequestParams) =>
  request<never>({
    config: { method: 'get' },
    url: `/address/search?parentObjectId=${parentObjectId || 0}&query=${query || ''}`
  })
