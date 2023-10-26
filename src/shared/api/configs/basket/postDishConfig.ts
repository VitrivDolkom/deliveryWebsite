import { authHeaders } from '../../authHeaders'
import { request } from '../../request'

interface PostDishParams {
  dishId: string
  token: TokenResponse
}

export const postDishConfig = ({ dishId, token }: PostDishParams) =>
  request<never>({
    config: { method: 'post', headers: { ...authHeaders(token) } },
    url: `/basket/dish/${dishId}`
  })
