import { request } from '../request'

export const registrationRequest = (dto: UserRegisterModel) => {
  request<UserRegisterModel>({ config: { method: 'post', data: dto }, url: '/account/register' })
}
