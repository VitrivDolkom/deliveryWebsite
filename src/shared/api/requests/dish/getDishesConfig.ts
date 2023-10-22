import { request } from '@/shared/api'

export interface GetDishesParams {
  categories?: string[]
  vegetarian?: string
  sorting?: string
  page?: string
}

export const getDishesConfig = ({ categories = [], page, sorting, vegetarian }: GetDishesParams) =>
  request<never>({
    config: { method: 'get' },
    url: `/dish?${categories
      .map((category) => `categories=${category}&`)
      .join('')}vegetarian=${vegetarian}${!sorting ? '' : `&sorting=${sorting}`}&page=${page}`
  })
