import { config } from '../../config'

export const postLoginConfig = (dto: LoginCredentials) =>
  config<LoginCredentials>({ config: { method: 'post', data: dto }, url: '/account/login' })
