import { request } from '../../request'

interface GetAddressChainParams {
  objectGuid: string
}

export const getAddressChainConfig = ({ objectGuid }: GetAddressChainParams) =>
  request<never>({
    config: { method: 'get' },
    url: `/address/getaddresschain?objectGuid=${objectGuid}`
  })
