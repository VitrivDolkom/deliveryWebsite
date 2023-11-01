import { authHeaders } from '../../authHeaders'
import { config } from '../../config'

interface PostRatingParams {
  id: string
  ratingScore: number
  token: TokenResponse
}

export const postRatingConfig = ({ id, ratingScore, token }: PostRatingParams) =>
  config<never>({
    config: { method: 'post', headers: { ...authHeaders(token) } },
    url: `/dish/${id}/rating?ratingScore=${ratingScore}`
  })
