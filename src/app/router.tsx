import {
  BasketPage,
  LoginPage,
  MenuDishPage,
  MenuPage,
  OrderPage,
  OrdersPage,
  PurchasePage,
  RegistrationPage
} from '@/pages'
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
        element: <MenuDishPage />
      },
      {
        path: routes.cart(),
        element: <BasketPage />
      },
      {
        path: routes.orders(),
        element: <OrdersPage />
      },
      {
        path: routes.order(),
        element: <OrderPage />
      },
      {
        path: routes.purchase(),
        element: <PurchasePage />
      }
    ]
  }
])
