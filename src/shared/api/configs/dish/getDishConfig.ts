import { config } from '../../config'

interface GetDishParams {
  id: string
}

export const getDishConfig = ({ id }: GetDishParams) =>
  config<never>({ config: { method: 'get' }, url: `/dish/${id}` })
