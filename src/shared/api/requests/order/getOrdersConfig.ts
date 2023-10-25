import { authHeaders } from '../../authHeaders'
import { request } from '../../request'

interface GetOrdersParams {
  token: TokenResponse
}

export const getOrdersConfig = ({ token }: GetOrdersParams) =>
  request<never>({
    config: { method: 'get', headers: { ...authHeaders(token) } },
    url: '/order'
  })
