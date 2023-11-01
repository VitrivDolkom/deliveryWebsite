import { useNavigate } from 'react-router-dom'
import { ButtonLoader, ChangeBasketDishAmount, Pagination, SearchLoader } from '@/shared/components'
import { routes } from '@/shared/const'
import { Button, Typography } from '@/shared/uikit'
import { MenuDishCard } from './MenuDishCard'
import s from './styles.module.css'

interface MenuDishesProps {
  isLoading: boolean
  actionLoading: boolean
  error: string
  dishPagedList: DishPagedListDto | null
  basket: DishBasketDto[] | null
  onPageChange: (page: number) => void
  onDishAdd?: (dishId: string) => void
  onDishDelete: (dishId: string, increase?: boolean) => void
}

export const MenuDishes = (props: MenuDishesProps) => {
  const {
    dishPagedList,
    error,
    isLoading,
    onPageChange,
    onDishAdd,
    actionLoading,
    basket,
    onDishDelete
  } = props

  const navigate = useNavigate()

  if (!!error) {
    return (
      <Typography tag="div" variant="err2">
        Ошибка получения блюд
      </Typography>
    )
  }

  const renderUserActions = (dishId: string): JSX.Element => {
    let userActions: JSX.Element = <></>

    if (!onDishAdd) return userActions

    const foundDish = basket?.find((currentDish) => currentDish.id === dishId)

    userActions = !foundDish ? (
      <Button
        styleType="solid"
        alertType="primary"
        className="btn"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation()
          onDishAdd(dishId)
        }}
        disabled={isLoading}
        loader={<ButtonLoader />}
      >
        В корзину
      </Button>
    ) : (
      <ChangeBasketDishAmount
        dish={foundDish}
        onDecreaseClick={onDishDelete}
        onIncreaseClick={onDishAdd}
      />
    )

    return userActions
  }

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        {isLoading && <SearchLoader />}
        {actionLoading && (
          <div className={s.actionLoader}>
            <ButtonLoader />
          </div>
        )}
        {!isLoading && (
          <div className={s.list}>
            {dishPagedList?.dishes.map((dish) => (
              <MenuDishCard
                key={dish.id}
                dish={dish}
                renderUserActions={() => renderUserActions(dish.id)}
                onClick={() => navigate(routes.item(dish.id))}
              />
            ))}
          </div>
        )}
        {!!dishPagedList && !isLoading && (
          <div className={s.pagination}>
            <Pagination pagination={dishPagedList.pagination} onPageChange={onPageChange} />
          </div>
        )}
      </div>
    </div>
  )
}
