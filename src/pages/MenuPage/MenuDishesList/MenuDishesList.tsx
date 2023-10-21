import { Pagination } from '@/shared/components'
import { Typography } from '@/shared/uikit'
import { MenuDishCard } from './MenuDishCard'
import s from './styles.module.css'

interface MenuDishesListProps {
  isLoading: boolean
  error: string
  dishPagedList: DishPagedListDto | null
}

export const MenuDishesList = ({ dishPagedList, error, isLoading }: MenuDishesListProps) => {
  if (isLoading) {
    return (
      <Typography tag="div" variant="t3">
        Подождите, блюда загружаются ...
      </Typography>
    )
  }

  if (!dishPagedList || !!error) {
    return (
      <Typography tag="div" variant="err2">
        Ошибка получения блюд, извините
      </Typography>
    )
  }

  return (
    <>
      <div className={s.list}>
        {dishPagedList.dishes.map((dish) => (
          <MenuDishCard key={dish.id} dish={dish} />
        ))}
      </div>
      <Pagination pagination={dishPagedList.pagination} />
    </>
  )
}
