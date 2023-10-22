import React from 'react'
import Select from 'react-select'
import { InputBlock } from '@/shared/components'
import {
  DishCategoryEnum,
  dishCategoryOptions,
  DishSortingEnum,
  dishSortingOptions
} from '@/shared/lib/const'
import { Button } from '@/shared/uikit'
import { MenuDishesList } from './MenuDishesList/MenuDishesList'
import { useMenuPage } from './useMenuPage'
import s from './styles.module.css'

export const MenuPage = () => {
  const {
    vegetarian,
    categories,
    sorting,
    dishPagedList,
    isLoading,
    error,
    onSortingChange,
    onCategoriesChange,
    onVegetarianChange,
    onFiltersApply,
    onPageChange
  } = useMenuPage()

  return (
    <div className={s.wrapper}>
      <div className={s.top}>
        <Select
          options={dishCategoryOptions}
          isSearchable={false}
          isMulti
          className={s.select}
          value={categories.map((category: string) => ({
            label: DishCategoryEnum[category as DishCategory] || '',
            value: category
          }))}
          onChange={onCategoriesChange}
        />
        <Select
          options={dishSortingOptions}
          isSearchable={false}
          isClearable={true}
          className={s.select}
          value={
            !sorting ? undefined : { label: DishSortingEnum[sorting as DishSorting], value: sorting }
          }
          onChange={onSortingChange}
        />
        <div className="vegan">
          <InputBlock
            label="Только вегатерианские"
            blockType="row"
            type="checkbox"
            checked={vegetarian === 'true'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onVegetarianChange(e.currentTarget.checked)
            }
          />
        </div>

        <Button styleType="solid" alertType="info" className="btn" onClick={onFiltersApply}>
          Применить
        </Button>
      </div>
      <MenuDishesList
        dishPagedList={dishPagedList}
        error={error}
        isLoading={isLoading}
        onPageChange={onPageChange}
      />
    </div>
  )
}
