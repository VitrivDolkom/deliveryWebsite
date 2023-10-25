export const routes = {
  root: () => '/',
  login: () => '/login',
  registration: () => '/registration',
  profile: () => '/profile',
  item: (itemId?: string) => `/item/${itemId || ':id'}`,
  cart: () => 'cart',
  orders: () => 'orders',
  order: (orderId?: string) => `/order/${orderId || ':id'}`,
  purchase: () => 'purchase'
}
