export const routes = {
  login: () => '/login',
  registration: () => '/registration',
  profile: () => '/profile',
  item: (itemId: string) => `/item/${itemId}`,
  cart: () => 'cart',
  orders: () => 'orders',
  order: (orderId: string) => `/order/${orderId}`,
  purchase: () => 'purchase'
}
