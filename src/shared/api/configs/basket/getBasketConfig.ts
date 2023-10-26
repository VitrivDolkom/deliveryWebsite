import { authHeaders } from '../../authHeaders'
import { config } from '../../config'

interface GetBasketParams {
  token: TokenResponse
}

export const getBasketConfig = ({ token }: GetBasketParams) =>
  config<never>({
    config: { method: 'get', headers: { ...authHeaders(token) } },
    url: '/basket'
  })
