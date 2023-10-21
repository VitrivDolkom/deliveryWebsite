export enum DishCategoryEnum {
  Wok = 'WOK',
  Pizza = 'Пицца',
  Soup = 'Суп',
  Dessert = 'Десерт',
  Drink = 'Напиток'
}

export const dishCategoryOptions: { label: DishCategoryEnum; value: DishCategory }[] = [
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

export const dishSortingOptions: { label: DishSortingEnum; value: DishSorting }[] = [
  { label: DishSortingEnum.NameAsc, value: 'NameAsc' },
  { label: DishSortingEnum.NameDesc, value: 'NameDesc' },
  { label: DishSortingEnum.PriceAsc, value: 'PriceAsc' },
  { label: DishSortingEnum.PriceDesc, value: 'PriceDesc' },
  { label: DishSortingEnum.RatingAsc, value: 'RatingAsc' },
  { label: DishSortingEnum.RatingDesc, value: 'RatingDesc' }
]
