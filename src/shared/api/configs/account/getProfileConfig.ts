import { authHeaders } from '../../authHeaders'
import { config } from '../../config'

export const getProfileConfig = (tokenResponse: TokenResponse) =>
  config<never>({
    config: { method: 'get', headers: { ...authHeaders(tokenResponse) } },
    url: '/account/profile'
  })
