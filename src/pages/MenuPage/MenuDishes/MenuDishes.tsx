import preloader from '@/assets/gifs/search.gif'
import { ButtonLoader, ChangeBasketDishAmount, Pagination } from '@/shared/components'
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
        alertType="success"
        className="btn"
        onClick={() => onDishAdd(dishId)}
        disabled={isLoading}
        loader={<ButtonLoader />}
      >
        В корзину
      </Button>
    ) : (
      <ChangeBasketDishAmount
        dish={foundDish}
        onDecreaseCLick={onDishDelete}
        onIncreaseCLick={() => onDishAdd(dishId)}
      />
    )

    return userActions
  }

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        {isLoading && (
          <div className={s.preloader}>
            <img src={preloader} alt="Загрузка..." />
          </div>
        )}
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
              />
            ))}
          </div>
        )}
        {!!dishPagedList && (
          <Pagination pagination={dishPagedList.pagination} onPageChange={onPageChange} />
        )}
      </div>
    </div>
  )
}
