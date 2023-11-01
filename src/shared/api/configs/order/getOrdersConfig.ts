import { authHeaders } from '../../authHeaders'
import { config } from '../../config'

interface GetOrdersParams {
  token: TokenResponse
}

export const getOrdersConfig = ({ token }: GetOrdersParams) =>
  config<never>({
    config: { method: 'get', headers: { ...authHeaders(token) } },
    url: '/order'
  })
