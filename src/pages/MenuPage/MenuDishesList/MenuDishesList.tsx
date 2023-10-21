import { Pagination } from '@/shared/components'
import { Typography } from '@/shared/uikit'
import { MenuDishCard } from './MenuDishCard'
import s from './styles.module.css'

interface MenuDishesListProps {
  isLoading: boolean
  error: string
  dishPagedList: DishPagedListDto | null
  onPageChange: (page: number) => void
}

export const MenuDishesList = ({
  dishPagedList,
  error,
  isLoading,
  onPageChange
}: MenuDishesListProps) => {
  if (isLoading) {
    return (
      <Typography tag="div" variant="t3">
        Подождите, блюда загружаются ...
      </Typography>
    )
  }

  if (!dishPagedList || !!error) {
    return (
      <Typography tag="div" variant="err1">
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
      <Pagination pagination={dishPagedList.pagination} onPageChange={onPageChange} />
    </>
  )
}
