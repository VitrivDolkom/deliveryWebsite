import { authHeaders } from '../../authHeaders'
import { request } from '../../request'

interface GetBasketParams {
  token: TokenResponse
}

export const getBasketConfig = ({ token }: GetBasketParams) =>
  request<never>({
    config: { method: 'post', headers: { ...authHeaders(token) } },
    url: '/basket'
  })
