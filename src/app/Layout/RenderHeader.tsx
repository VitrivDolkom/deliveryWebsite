import { Link, useNavigate } from 'react-router-dom'
import { postLogoutConfig } from '@/shared/api'
import { Header } from '@/shared/components'
import { routes } from '@/shared/const'
import { useBasketContext, useUserContext, useUserSwitcherContext } from '@/shared/lib/contexts'
import { toastOnErrorRequest } from '@/shared/lib/helpers'
import { useRequest } from '@/shared/lib/hooks'
import { Button, Typography } from '@/shared/uikit'

export const RenderHeader = () => {
  const navigate = useNavigate()
  const { isAuth, user } = useUserContext()
  const { logout } = useUserSwitcherContext()
  const { basket } = useBasketContext()

  const { requestHandler: logoutRequest } = useRequest<never>({
    onSuccess: () => logout(),
    onError: () => {
      toastOnErrorRequest('Ошибка выхода')
    }
  })

  const onLoginClick = () => {
    navigate(routes.login())
  }

  const onRegisterClick = () => {
    navigate(routes.registration())
  }

  const onLogoutClick = () => {
    logoutRequest(postLogoutConfig({ token: user.token }))
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
                  Корзина{!!basket?.length && ` (${basket.length})`}
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
            <Button styleType="outlined" alertType="danger" onClick={onLogoutClick}>
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
