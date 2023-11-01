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
import { createBrowserRouter, Outlet } from 'react-router-dom'
import { ProfilePage } from '@/pages/ProfilePage'
import { routes } from '@/shared/const'
import { Layout } from './Layout/Layout'
import { ProtectedRoute } from './ProtectedRoute'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
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
          },
          {
            path: routes.profile(),
            element: <ProfilePage />
          }
        ]
      },
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
        path: routes.item(),
        element: <MenuDishPage />
      }
    ]
  }
])
