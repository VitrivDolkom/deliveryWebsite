import { request } from '../request'

export const loginRequest = (dto: LoginCredentials) =>
  request<LoginCredentials>({ config: { method: 'post', data: dto }, url: '/account/login' })
