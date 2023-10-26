import { config } from '../../config'

interface GetSearchConfigParams {
  parentObjectId?: number
  query?: string
}

export const getSearchConfig = ({ parentObjectId, query }: GetSearchConfigParams) =>
  config<never>({
    config: { method: 'get' },
    url: `/address/search?parentObjectId=${parentObjectId || 0}&query=${query || ''}`
  })
