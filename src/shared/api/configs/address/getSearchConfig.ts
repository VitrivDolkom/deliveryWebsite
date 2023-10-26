import { request } from '../../request'

interface GetSearchConfigParams {
  parentObjectId?: number
  query?: string
}

export const getSearchConfig = ({ parentObjectId, query }: GetSearchConfigParams) =>
  request<never>({
    config: { method: 'get' },
    url: `/address/search?parentObjectId=${parentObjectId || 0}&query=${query || ''}`
  })
