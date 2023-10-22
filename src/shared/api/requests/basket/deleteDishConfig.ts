import { authHeaders } from '../../authHeaders'
import { request } from '../../request'

interface DeleteDishParams {
  dishId: string
  token: TokenResponse
  increase?: boolean
}

export const deleteDishConfig = ({ dishId, token, increase = false }: DeleteDishParams) =>
  request<never>({
    config: { method: 'delete', headers: { ...authHeaders(token) } },
    url: `/basket/dish/${dishId}?increase=${increase}`
  })
