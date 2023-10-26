import { request } from '../../request'

export const postLoginConfig = (dto: LoginCredentials) =>
  request<LoginCredentials>({ config: { method: 'post', data: dto }, url: '/account/login' })
