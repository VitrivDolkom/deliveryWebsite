import { createContext, useContext } from 'react'

interface IBasketContext {
  basket: DishBasketDto[] | null
  basketError: string
  basketLoading: boolean
  actionLoading: boolean
  fetchBasket: () => void
  deleteDish: (dishId: string, increase?: boolean) => void
  addDish: (dishId: string) => void
}

export const BasketContext = createContext<IBasketContext>({
  basket: [],
  basketError: '',
  basketLoading: false,
  actionLoading: false,
  fetchBasket: () => {},
  deleteDish: () => {},
  addDish: () => {}
})

export const useBasketContext = () => useContext(BasketContext)
export const useBasketSwitcherContext = () => useContext(BasketContext)
