import { getBasketConfig } from '@/shared/api'
import { BasketContext, useUserContext } from '@/shared/lib/contexts'
import { useRequest } from '@/shared/lib/hooks'

export const BasketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserContext()

  const {
    data: basket,
    isLoading: basketLoading,
    error: basketError,
    requestHandler: getBasket
  } = useRequest<DishBasketDto[]>({})

  const fetchBasket = () => {
    getBasket(getBasketConfig({ token: { token: user.token } }))
  }

  return (
    <BasketContext.Provider value={{ basket, fetchBasket, basketLoading, basketError }}>
      {children}
    </BasketContext.Provider>
  )
}
