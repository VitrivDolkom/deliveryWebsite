import React from 'react'
import Select from 'react-select'
import { InputBlock, Pagination } from '@/shared/components'
import {
  DishCategoryEnum,
  dishCategoryOptions,
  DishSortingEnum,
  dishSortingOptions
} from '@/shared/lib/const'
import { Button } from '@/shared/uikit'
import { MenuDishCard } from './MenuDishCard/MenuDishCard'
import { useMenuPage } from './useMenuPage'
import s from './styles.module.css'

export const MenuPage = () => {
  const {
    vegetarian,
    categories,
    sorting,
    dishPagedList,
    onSortingChange,
    onCategoriesChange,
    onVegetarianChange
  } = useMenuPage()

  if (!dishPagedList) {
    return <div>Loading</div>
  }

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
            label="Показать только вегатерианские"
            blockType="row"
            type="checkbox"
            value={vegetarian}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onVegetarianChange(e.currentTarget.checked)
            }
          />
        </div>
        <Button styleType="solid" alertType="info" className="btn">
          Применить
        </Button>
      </div>
      <div className={s.list}>
        {dishPagedList.dishes.map((dish) => (
          <MenuDishCard key={dish.id} dish={dish} />
        ))}
      </div>
      <Pagination pagination={dishPagedList.pagination} />
    </div>
  )
}
