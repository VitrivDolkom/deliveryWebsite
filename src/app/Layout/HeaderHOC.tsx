import { Link, useNavigate } from 'react-router-dom'
import { Header } from '@/shared/components'
import { routes } from '@/shared/const'
import { useUserContext } from '@/shared/lib/contexts'
import { Button, Typography } from '@/shared/uikit'

export const HeaderHOC = () => {
  const navigate = useNavigate()
  const { isAuth, user } = useUserContext()

  const onLoginClick = () => {
    navigate(routes.login())
  }

  const onRegisterClick = () => {
    navigate(routes.registration())
  }

  return (
    <Header
      renderNavbar={() => (
        <>
          <Typography tag="div" variant="t3">
            Delievery.Кушац
          </Typography>

          <Link to={routes.root()}>
            <Typography tag="span" variant="t1" isLink={true}>
              Меню
            </Typography>
          </Link>

          {isAuth && (
            <>
              <Link to={routes.orders()}>
                <Typography tag="span" variant="t1" isLink={true}>
                  Заказы
                </Typography>
              </Link>
              <Link to={routes.cart()}>
                <Typography tag="span" variant="t1" isLink={true}>
                  Корзина
                </Typography>
              </Link>
            </>
          )}
        </>
      )}
      renderUserActions={() => (
        <>
          {!!user.email && (
            <Link to={routes.profile()}>
              <Typography tag="span" variant="t2">
                {user.email}
              </Typography>
            </Link>
          )}
          {isAuth && (
            <Button styleType="outlined" alertType="danger">
              Выйти
            </Button>
          )}
          {!isAuth && (
            <>
              <Button onClick={onRegisterClick} className="btn" styleType="solid" alertType="info">
                Регистрация
              </Button>
              <Button onClick={onLoginClick} className="btn" styleType="solid" alertType="info">
                Вход
              </Button>
            </>
          )}
        </>
      )}
    />
  )
}
