import { CartPage, LoginPage, MenuPage, RegistrationPage } from '@/pages'
import { createBrowserRouter } from 'react-router-dom'
import { ProfilePage } from '@/pages/ProfilePage'
import { routes } from '@/shared/const'
import { Layout } from './Layout/Layout'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: routes.root(),
        element: <MenuPage />
      },
      {
        path: routes.login(),
        element: <LoginPage />
      },
      {
        path: routes.registration(),
        element: <RegistrationPage />
      },
      {
        path: routes.profile(),
        element: <ProfilePage />
      },
      {
        path: routes.item(),
        element: null
      },
      {
        path: routes.cart(),
        element: <CartPage />
      },
      {
        path: routes.orders(),
        element: null
      },
      {
        path: routes.order(),
        element: null
      },
      {
        path: routes.purchase(),
        element: null
      }
    ]
  }
])
