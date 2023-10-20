import { authHeaders } from '../../authHeaders'
import { request } from '../../request'

export const getProfileRequest = (tokenResponse: TokenResponse) =>
  request<never>({
    config: { method: 'get', headers: { ...authHeaders(tokenResponse) } },
    url: '/account/profile'
  })
