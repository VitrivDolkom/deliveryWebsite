import { authHeaders } from '../../authHeaders'
import { config } from '../../config'

interface GetOrderParams {
  token: TokenResponse
  id: string
}

export const getOrderConfig = ({ token, id }: GetOrderParams) =>
  config<never>({
    config: { method: 'get', headers: { ...authHeaders(token) } },
    url: `/order/${id}`
  })
