import { authHeaders } from '../../authHeaders'
import { request } from '../../request'

interface PostOrderStatusParams {
  token: TokenResponse
  id: string
}

export const postOrderStatusConfig = ({ token, id }: PostOrderStatusParams) =>
  request<never>({
    config: { method: 'post', headers: { ...authHeaders(token) } },
    url: `/order/${id}/status`
  })
