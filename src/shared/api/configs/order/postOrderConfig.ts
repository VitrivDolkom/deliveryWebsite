import { authHeaders } from '../../authHeaders'
import { request } from '../../request'

interface PostOrderParams {
  dto: OrderCreateDto
  token: TokenResponse
}

export const postOrderConfig = ({ token, dto }: PostOrderParams) =>
  request<OrderCreateDto>({
    config: { method: 'post', data: dto, headers: { ...authHeaders(token) } },
    url: '/order'
  })
