import { authHeaders } from '../../authHeaders'
import { request } from '../../request'

interface PostRatingParams {
  id: string
  ratingScore: number
  token: TokenResponse
}

export const postRatingConfig = ({ id, ratingScore, token }: PostRatingParams) =>
  request<never>({
    config: { method: 'post', headers: { ...authHeaders(token) } },
    url: `/dish/${id}/rating?ratingScore=${ratingScore}`
  })
