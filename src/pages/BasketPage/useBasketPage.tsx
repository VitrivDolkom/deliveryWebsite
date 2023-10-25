import { useBasketContext, useBasketSwitcherContext } from '@/shared/lib/contexts'

export const useBasketPage = () => {
  const { basket, basketError, basketLoading: isLoading } = useBasketContext()
  const { addDish: onDishAdd, deleteDish: onDishDelete } = useBasketSwitcherContext()

  return {
    basket,
    basketError,
    isLoading,
    onDishDelete,
    onDishAdd
  }
}
