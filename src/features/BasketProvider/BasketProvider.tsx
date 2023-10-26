/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { deleteDishConfig, getBasketConfig, postDishConfig } from '@/shared/api'
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

  const {
    isLoading: deleteDishLoading,
    error: deleteDishError,
    requestHandler: fetchDeleteDish,
    isSuccess: deleteDishSuccess
  } = useRequest<DishBasketDto[]>({})

  const {
    isLoading: addDishLoading,
    error: addDishError,
    requestHandler: fetchAddDish,
    isSuccess: addDishSuccess
  } = useRequest<DishBasketDto[]>({})

  const actionLoading = addDishLoading || deleteDishLoading

  React.useEffect(() => {
    fetchBasket()
  }, [])

  React.useEffect(() => {
    if (deleteDishSuccess) {
      fetchBasket()
    }
  }, [deleteDishSuccess])

  React.useEffect(() => {
    if (addDishSuccess) {
      fetchBasket()
    }
  }, [addDishSuccess])

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
