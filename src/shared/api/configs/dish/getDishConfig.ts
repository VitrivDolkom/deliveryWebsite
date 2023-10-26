import { request } from '../../request'

interface GetDishParams {
  id: string
}

export const getDishConfig = ({ id }: GetDishParams) =>
  request<never>({ config: { method: 'get' }, url: `/dish/${id}` })
