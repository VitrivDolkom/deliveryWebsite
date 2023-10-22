import { authHeaders } from '../../authHeaders'
import { request } from '../../request'

interface GetBasketParams {
  token: TokenResponse
}

export const getBasketConfig = ({ token }: GetBasketParams) =>
  request<never>({
    config: { method: 'get', headers: { ...authHeaders(token) } },
    url: '/basket'
  })
