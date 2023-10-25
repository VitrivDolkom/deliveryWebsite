import { authHeaders } from '../../authHeaders'
import { request } from '../../request'

interface GetOrderParams {
  token: TokenResponse
  id: string
}

export const getOrderConfig = ({ token, id }: GetOrderParams) =>
  request<never>({
    config: { method: 'get', headers: { ...authHeaders(token) } },
    url: `/order/${id}`
  })
