import { authHeaders } from '../../authHeaders'
import { request } from '../../request'

export const putProfileConfig = (dto: UserEditModel, tokenResponse: TokenResponse) =>
  request<UserEditModel>({
    config: { method: 'put', data: dto, headers: { ...authHeaders(tokenResponse) } },
    url: '/account/profile'
  })
