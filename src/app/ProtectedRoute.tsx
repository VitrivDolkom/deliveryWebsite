import { routes } from '@/shared/const'
import { useUserContext } from '@/shared/lib/contexts'
import { Navigate, useLocation } from 'react-router-dom'

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation()
  const { isAuth } = useUserContext()

  return isAuth ? children : <Navigate to={routes.login()} replace state={{ from: location }} />
}
