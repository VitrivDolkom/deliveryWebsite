import { createBrowserRouter } from 'react-router-dom'
import { routes } from '@/shared/const'
import { Layout } from './Layout'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: routes.login(),
        element: null
      },
      {
        path: routes.registration(),
        element: null
      },
      {
        path: routes.profile(),
        element: null
      },
      {
        path: routes.item(),
        element: null
      },
      {
        path: routes.cart(),
        element: null
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
