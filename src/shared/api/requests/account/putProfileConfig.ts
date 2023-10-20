import { authHeaders } from '../../authHeaders'
import { request } from '../../request'

export const putProfileConfig = (dto: Partial<UserDto>, tokenResponse: TokenResponse) =>
  request<Partial<UserDto>>({
    config: { method: 'put', data: dto, headers: { ...authHeaders(tokenResponse) } },
    url: '/account/profile'
  })
