import preloader from '@/assets/gifs/search.gif'
import { Pagination } from '@/shared/components'
import { Typography } from '@/shared/uikit'
import { MenuDishCard } from './MenuItemCard'
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
  if (!!error) {
    return (
      <Typography tag="div" variant="err2">
        Ошибка получения блюд, извините
      </Typography>
    )
  }

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        {isLoading && (
          <div className={s.preloader}>
            <img src={preloader} alt="Загрузка..." />
          </div>
        )}
        {!isLoading && (
          <div className={s.list}>
            {dishPagedList?.dishes.map((dish) => <MenuDishCard key={dish.id} dish={dish} />)}
          </div>
        )}
      </div>
      {!!dishPagedList && (
        <Pagination pagination={dishPagedList.pagination} onPageChange={onPageChange} />
      )}
    </div>
  )
}