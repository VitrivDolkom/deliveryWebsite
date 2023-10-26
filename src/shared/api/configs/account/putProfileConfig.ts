import { authHeaders } from '../../authHeaders'
import { config } from '../../config'

export const putProfileConfig = (dto: UserEditModel, tokenResponse: TokenResponse) =>
  config<UserEditModel>({
    config: { method: 'put', data: dto, headers: { ...authHeaders(tokenResponse) } },
    url: '/account/profile'
  })
