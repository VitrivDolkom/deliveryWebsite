import React from 'react'
import { deleteDishConfig, getBasketConfig, postDishConfig } from '@/shared/api'
import { BasketContext, useUserContext } from '@/shared/lib/contexts'
import { toastOnErrorRequest, toastOnSuccessRequest } from '@/shared/lib/helpers'
import { useRequest } from '@/shared/lib/hooks'

export const BasketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuth } = useUserContext()

  const {
    data: basket,
    isLoading: basketLoading,
    error: basketError,
    requestHandler: getBasket
  } = useRequest<DishBasketDto[]>({})

  const { isLoading: deleteDishLoading, requestHandler: fetchDeleteDish } = useRequest<DishBasketDto[]>({
    onSuccess: () => {
      fetchBasket()
      toastOnSuccessRequest()
    },
    onError: () => toastOnErrorRequest('Ошибка при удалении из корзины')
  })

  const { isLoading: addDishLoading, requestHandler: fetchAddDish } = useRequest<DishBasketDto[]>({
    onSuccess: () => {
      toastOnSuccessRequest()
      fetchBasket()
    },
    onError: () => toastOnErrorRequest('Ошибка при добавлении в корзину')
  })

  const actionLoading = addDishLoading || deleteDishLoading

  React.useEffect(() => {
    if (isAuth) {
      fetchBasket()
    }
  }, [])

  const fetchBasket = () => {
    getBasket(getBasketConfig({ token: { token: user.token } }))
  }

  const deleteDish = (dishId: string, increase?: boolean) => {
    fetchDeleteDish(
      deleteDishConfig({ token: { token: user.token }, dishId: dishId, increase: increase })
    )
  }

  const addDish = (dishId: string) => {
    fetchAddDish(postDishConfig({ token: { token: user.token }, dishId: dishId }))
  }

  return (
    <BasketContext.Provider
      value={{
        basket,
        fetchBasket,
        basketLoading,
        basketError,
        deleteDish,
        addDish,
        actionLoading,
        isEmpty: !basket?.length
      }}
    >
      {children}
    </BasketContext.Provider>
  )
}
