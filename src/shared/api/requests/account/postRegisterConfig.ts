import { request } from '../../request'

export const postRegisterConfig = (dto: UserRegisterModel) =>
  request<UserRegisterModel>({
    config: { method: 'post', data: dto },
    url: '/account/register'
  })
