import { authHeaders } from '../../authHeaders'
import { config } from '../../config'

interface PostOrderStatusParams {
  token: TokenResponse
  id: string
}

export const postOrderStatusConfig = ({ token, id }: PostOrderStatusParams) =>
  config<never>({
    config: { method: 'post', headers: { ...authHeaders(token) } },
    url: `/order/${id}/status`
  })
