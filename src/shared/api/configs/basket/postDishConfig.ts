import { authHeaders } from '../../authHeaders'
import { config } from '../../config'

interface PostDishParams {
  dishId: string
  token: TokenResponse
}

export const postDishConfig = ({ dishId, token }: PostDishParams) =>
  config<never>({
    config: { method: 'post', headers: { ...authHeaders(token) } },
    url: `/basket/dish/${dishId}`
  })
