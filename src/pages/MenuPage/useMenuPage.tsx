import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { MultiValue, SingleValue } from 'react-select'
import { getDishesConfig, postDishConfig } from '@/shared/api'
import { DishCategoryOption, DishSortingOption } from '@/shared/lib/const'
import { useUserContext } from '@/shared/lib/contexts'
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

  const { user } = useUserContext()

  const {
    data: dishPagedList,
    isLoading,
    error,
    requestHandler: fetchDishes
  } = useRequest<DishPagedListDto>({
    onMount: true,
    config: getDishesConfig({ categories, page, sorting, vegetarian }),
    duration: 800
  })

  const { isLoading: addDishLoading, requestHandler: addDish } = useRequest<DishBasketDto[]>({})

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

  const onDishAdd = !user.token
    ? undefined
    : (dishId: string) => {
        addDish(postDishConfig({ dishId, token: { token: user.token } }))
      }

  return {
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
    addDishLoading
  }
}
