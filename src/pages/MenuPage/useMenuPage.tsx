import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { MultiValue, SingleValue } from 'react-select'
import { getDishesConfig } from '@/shared/api'
import { DishCategoryOption, DishSortingOption } from '@/shared/const'
import { useBasketContext, useBasketSwitcherContext, useUserContext } from '@/shared/lib/contexts'
import { toastOnErrorRequest } from '@/shared/lib/helpers'
import { useRequest } from '@/shared/lib/hooks'

export const useMenuPage = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    categories: [],
    vegetarian: 'false',
    sorting: '',
    page: '1'
  })

  const categories = searchParams.getAll('categories') || []
  const vegetarian = searchParams.get('vegetarian') || 'false'
  const sorting = searchParams.get('sorting') || ''
  const page = searchParams.get('page') || '1'

  const { isAuth } = useUserContext()
  const { actionLoading, basket } = useBasketContext()
  const { addDish, deleteDish } = useBasketSwitcherContext()

  const {
    data: dishPagedList,
    isLoading,
    error,
    requestHandler: fetchDishes
  } = useRequest<DishPagedListDto>({
    onMount: true,
    config: getDishesConfig({ categories, page, sorting, vegetarian }),
    duration: 800,
    onError: (error) => toastOnErrorRequest(error || 'Ошибка при получении меню')
  })

  React.useEffect(() => {
    setSearchParams(searchParams)
  }, [])

  React.useEffect(() => {
    fetchDishes(getDishesConfig({ categories, page, sorting, vegetarian }))
  }, [page])

  const onSortingChange = (selectedOption: SingleValue<DishSortingOption>) => {
    searchParams.set('sorting', selectedOption?.value || '')
    setSearchParams(searchParams)
  }

  const onVegetarianChange = (newValue: boolean) => {
    searchParams.set('vegetarian', newValue.toString())
    setSearchParams(searchParams)
  }

  const onCategoriesChange = (selectedOptions: MultiValue<DishCategoryOption>) => {
    if (!selectedOptions) return

    searchParams.delete('categories')
    selectedOptions.forEach((category) => {
      searchParams.append('categories', category.value)
    })

    setSearchParams(searchParams)
  }

  const onFiltersApply = () => {
    fetchDishes(getDishesConfig({ categories, page, sorting, vegetarian }))
  }

  const onPageChange = (pageNumber: number) => {
    searchParams.set('page', pageNumber.toString())
    setSearchParams(searchParams)
  }

  const onDishAdd = isAuth ? (dishId: string) => addDish(dishId) : undefined
  const onDishDelete = (dishId: string, increase?: boolean) => deleteDish(dishId, increase)

  return {
    basket,
    categories,
    vegetarian,
    sorting,
    isLoading,
    page,
    dishPagedList,
    error,
    onSortingChange,
    onCategoriesChange,
    onVegetarianChange,
    onFiltersApply,
    onPageChange,
    onDishAdd,
    actionLoading,
    onDishDelete
  }
}
