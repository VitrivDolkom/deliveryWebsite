import { authHeaders } from '../../authHeaders'
import { config } from '../../config'

interface PostOrderParams {
  dto: OrderCreateDto
  token: TokenResponse
}

export const postOrderConfig = ({ token, dto }: PostOrderParams) =>
  config<OrderCreateDto>({
    config: { method: 'post', data: dto, headers: { ...authHeaders(token) } },
    url: '/order'
  })
