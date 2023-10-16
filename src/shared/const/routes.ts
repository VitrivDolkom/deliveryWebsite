export const routes = {
  root: () => '/',
  login: () => '/login',
  registration: () => '/registration',
  profile: () => '/profile',
  item: (itemId?: string) => `/item/${itemId || ':orderId'}`,
  cart: () => 'cart',
  orders: () => 'orders',
  order: (orderId?: string) => `/order/${orderId || ':orderId'}`,
  purchase: () => 'purchase'
}
