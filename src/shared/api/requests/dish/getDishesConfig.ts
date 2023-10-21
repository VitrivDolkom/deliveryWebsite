import { request } from '@/shared/api'

interface GetDishesParams {
  categories: DishCategory[]
  vegetarian: boolean
  sorting: DishSorting
  page: number
}

export const getDishesConfig = ({ categories, page, sorting, vegetarian }: GetDishesParams) =>
  request<never>({
    config: { method: 'get' },
    url: `/dish?parentObjectId=${categories.map(
      (category) => `categories=${category}&`
    )}vegetarian=${vegetarian}&sorting=${sorting}&page=${page}`
  })
