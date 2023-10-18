import { request } from '@/shared/api'

interface AddressSearchRequestParams {
  parentObjectId?: number
  query?: string
}

export const addressSearchRequest = ({ parentObjectId, query }: AddressSearchRequestParams) =>
  request<SearchAddressModel[]>({
    config: { method: 'get' },
    url: `/address/search?parentObjectId=${parentObjectId || 0}&query=${query || ''}`
  })
