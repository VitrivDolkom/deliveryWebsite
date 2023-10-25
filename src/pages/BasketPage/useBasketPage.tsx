import { useBasketContext } from '@/shared/lib/contexts'
import { useRequest } from '@/shared/lib/hooks'

export const useBasketPage = () => {
  const { basket, basketError, basketLoading: isLoading } = useBasketContext()

  const {
    isLoading: deleteDishLoading,
    error: deleteDishError,
    requestHandler: deleteDish
  } = useRequest<DishBasketDto[]>({})

  const {
    isLoading: addDishLoading,
    error: addDishError,
    requestHandler: addDish
  } = useRequest<DishBasketDto[]>({})

  return {
    basket,
    basketError,
    isLoading,
    deleteDish,
    deleteDishError,
    deleteDishLoading,
    addDish,
    addDishError,
    addDishLoading
  }
}
