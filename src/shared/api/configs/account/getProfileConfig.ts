import { authHeaders } from '../../authHeaders'
import { request } from '../../request'

export const getProfileConfig = (tokenResponse: TokenResponse) =>
  request<never>({
    config: { method: 'get', headers: { ...authHeaders(tokenResponse) } },
    url: '/account/profile'
  })
