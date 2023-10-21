import { useSearchParams } from 'react-router-dom'
import { MultiValue, SingleValue } from 'react-select'
import { getDishesConfig } from '@/shared/api'
import { DishCategoryOption, DishSortingOption } from '@/shared/lib/const'
import { useRequest } from '@/shared/lib/hooks'

export const useMenuPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const categories = searchParams.getAll('categories') || []
  const vegetarian = searchParams.get('vegetarian') || 'false'
  const sorting = searchParams.get('sorting') || ''
  const page = searchParams.get('page') || '1'

  const {
    data: dishPagedList,
    isLoading,
    error,
    requestHandler: fetchDishes
  } = useRequest<DishPagedListDto>(true, getDishesConfig({ categories, page, sorting, vegetarian }))

  const onSortingChange = (selectedOption: SingleValue<DishSortingOption>) => {
    setSearchParams((prev) => {
      prev.set('sorting', selectedOption?.value || '')
      return prev
    })
  }

  const onVegetarianChange = (newValue: boolean) => {
    setSearchParams((prev) => {
      prev.set('vegetarian', newValue.toString())
      return prev
    })
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
    onFiltersApply
  }
}
