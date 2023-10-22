import { getBasketConfig } from '@/shared/api'
import { useUserContext } from '@/shared/lib/contexts'
import { useRequest } from '@/shared/lib/hooks'

export const useCartPage = () => {
  const { user } = useUserContext()

  const {
    data: basket,
    isLoading,
    error: basketError
  } = useRequest<DishBasketDto[]>({
    onMount: true,
    config: getBasketConfig({ token: { token: user.token } })
  })

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
