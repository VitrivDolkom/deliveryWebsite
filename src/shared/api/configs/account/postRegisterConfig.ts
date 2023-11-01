import { config } from '../../config'

export const postRegisterConfig = (dto: UserRegisterModel) =>
  config<UserRegisterModel>({
    config: { method: 'post', data: dto },
    url: '/account/register'
  })
