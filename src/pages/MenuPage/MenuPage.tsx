import React from 'react'
import Select from 'react-select'
import { ToastContainer } from 'react-toastify'
import { InputBlock } from '@/shared/components'
import {
  DishCategoryEnum,
  dishCategoryOptions,
  DishSortingEnum,
  dishSortingOptions
} from '@/shared/lib/const'
import { Button } from '@/shared/uikit'
import { MenuDishes } from './MenuDishes/MenuDishes'
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
    onPageChange,
    onDishAdd,
    actionLoading,
    basket,
    onDishDelete
  } = useMenuPage()

  return (
    <div className={s.wrapper}>
      <ToastContainer />
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
      <MenuDishes
        basket={basket}
        dishPagedList={dishPagedList}
        error={error}
        isLoading={isLoading}
        onDishAdd={onDishAdd}
        onPageChange={onPageChange}
        actionLoading={actionLoading}
        onDishDelete={onDishDelete}
      />
    </div>
  )
}
