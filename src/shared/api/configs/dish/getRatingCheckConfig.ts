import { authHeaders } from '../../authHeaders'
import { config } from '../../config'

interface GetRatingCheckParams {
  id: string
  token: TokenResponse
}

export const getRatingCheckConfig = ({ id, token }: GetRatingCheckParams) =>
  config<never>({
    config: { method: 'post', headers: { ...authHeaders(token) } },
    url: `/dish/${id}/rating/check`
  })
