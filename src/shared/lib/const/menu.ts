export enum DishCategoryEnum {
  Wok = 'WOK',
  Pizza = 'Пицца',
  Soup = 'Суп',
  Dessert = 'Десерт',
  Drink = 'Напиток'
}

export interface DishCategoryOption {
  label: DishCategoryEnum
  value: string
}

export const dishCategoryOptions: DishCategoryOption[] = [
  { label: DishCategoryEnum.Wok, value: 'Wok' },
  { label: DishCategoryEnum.Pizza, value: 'Pizza' },
  { label: DishCategoryEnum.Soup, value: 'Soup' },
  { label: DishCategoryEnum.Dessert, value: 'Dessert' },
  { label: DishCategoryEnum.Drink, value: 'Drink' }
]

export enum DishSortingEnum {
  NameAsc = 'А-Я',
  NameDesc = 'Я-А',
  PriceAsc = 'Цена ↑',
  PriceDesc = 'Цена ↓',
  RatingAsc = 'Рейтинг ↑',
  RatingDesc = 'Рейтинг ↓'
}

export interface DishSortingOption {
  label: DishSortingEnum
  value: string
}

export const dishSortingOptions: DishSortingOption[] = [
  { label: DishSortingEnum.NameAsc, value: 'NameAsc' },
  { label: DishSortingEnum.NameDesc, value: 'NameDesc' },
  { label: DishSortingEnum.PriceAsc, value: 'PriceAsc' },
  { label: DishSortingEnum.PriceDesc, value: 'PriceDesc' },
  { label: DishSortingEnum.RatingAsc, value: 'RatingAsc' },
  { label: DishSortingEnum.RatingDesc, value: 'RatingDesc' }
]
