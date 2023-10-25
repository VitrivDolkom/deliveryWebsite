import { createContext, useContext } from 'react'

interface IBasketContext {
  basket: DishBasketDto[] | null
  basketError: string
  basketLoading: boolean
  fetchBasket: () => void
}

export const BasketContext = createContext<IBasketContext>({
  basket: [],
  fetchBasket: () => {},
  basketError: '',
  basketLoading: false
})

export const useBasketContext = () => useContext(BasketContext)
export const useBasketSwitcherContext = () => useContext(BasketContext)
