import { authHeaders } from '../../authHeaders'
import { config } from '../../config'

export const postLogoutConfig = (token: TokenResponse) =>
  config<never>({
    config: { method: 'post', headers: { ...authHeaders(token) } },
    url: '/account/logout'
  })
