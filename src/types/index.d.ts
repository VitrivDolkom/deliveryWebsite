/* eslint-disable @typescript-eslint/no-unused-vars */
export {}

declare global {
  type Nullable<T> = T | null
  type Id = string
  type AddressId = string
  type Gender = 'Male' | 'Female'
  type OrderStatus = 'InProcess' | 'Delivered'
  type DishCategory = 'Wok' | 'Pizza' | 'Soup' | 'Dessert' | 'Drink'
  type DishSorting = 'NameAsc' | 'NameDesc' | 'PriceAsc' | 'PriceDesc' | 'RatingAsc' | 'RatingDesc'
  type GarAddressLevel =
    | 'Region'
    | 'AdministrativeArea'
    | 'MunicipalArea'
    | 'RuralUrbanSettlement'
    | 'City'
    | 'Locality'
    | 'ElementOfPlanningStructure'
    | 'ElementOfRoadNetwork'
    | 'Land'
    | 'Building'
    | 'Room'
    | 'RoomInRooms'
    | 'AutonomousRegionLevel'
    | 'IntracityLevel'
    | 'AdditionalTerritoriesLevel'
    | 'LevelOfObjectsInAdditionalTerritories'
    | 'CarPlace'

  interface DishBasketDto {
    id: Id
    name: string
    price: number
    totalPrice: number
    amount: number
    image: string
  }

  interface DishDto {
    id: Id
    name: string
    description: string
    price: number
    image: string
    vegetarian: boolean
    rating: number
    category: DishCategory
  }

  interface PageInfoModel {
    size: number
    count: number
    current: number
  }

  interface DishPagedListDto {
    dishes: DishDto[]
    pagination: PageInfoModel
  }

  interface LoginCredentials {
    email: string
    password: string
  }

  interface OrderCreateDto {
    deliveryTime: string
    addressId: AddressId
  }

  interface OrderDto {
    id: Id
    deliveryTime: string
    orderTime: string
    status: OrderStatus
    price: number
    dishes: DishDto[]
    address: string
  }

  interface OrderInfoDto {
    id: Id
    deliveryTime: string
    orderTime: string
    status: OrderStatus
    price: number
  }

  interface Response {
    status: string
    message: string
  }

  interface SearchAddressModel {
    objectId: number
    objectGuid: Id
    text: string
    objectLevel: GarAddressLevel
    objectLevelText: string
  }

  interface TokenResponse {
    token: string
  }

  interface UserDto {
    id: Id
    fullName: string
    birthDate: string
    gender: Gender
    address: AddressId
    email: string
    phoneNumber: string
  }

  interface UserEditModel {
    fullName: string
    birthDate: string
    gender: Gender
    addressId: AddressId
    phoneNumber: string
  }

  interface UserRegisterModel {
    fullName: string
    password: string
    email: string
    addressId: AddressId
    birthDate: string
    gender: Gender
    phoneNumber: string
  }
}
