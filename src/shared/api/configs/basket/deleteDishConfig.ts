import { authHeaders } from '../../authHeaders'
import { config } from '../../config'

interface DeleteDishParams {
  dishId: string
  token: TokenResponse
  increase?: boolean
}

export const deleteDishConfig = ({ dishId, token, increase = true }: DeleteDishParams) =>
  config<never>({
    config: { method: 'delete', headers: { ...authHeaders(token) } },
    url: `/basket/dish/${dishId}?increase=${increase}`
  })
