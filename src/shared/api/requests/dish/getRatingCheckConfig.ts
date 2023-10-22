import { authHeaders } from '../../authHeaders'
import { request } from '../../request'

interface GetRatingCheckParams {
  id: string
  token: TokenResponse
}

export const getRatingCheckConfig = ({ id, token }: GetRatingCheckParams) =>
  request<never>({
    config: { method: 'post', headers: { ...authHeaders(token) } },
    url: `/dish/${id}/rating/check`
  })
