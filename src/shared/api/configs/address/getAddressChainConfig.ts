import { config } from '../../config'

interface GetAddressChainParams {
  objectGuid: string
}

export const getAddressChainConfig = ({ objectGuid }: GetAddressChainParams) =>
  config<never>({
    config: { method: 'get' },
    url: `/address/getaddresschain?objectGuid=${objectGuid}`
  })
