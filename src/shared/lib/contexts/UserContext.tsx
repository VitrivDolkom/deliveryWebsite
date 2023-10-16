import { createContext } from 'react'

export interface UserContextInfo {
  token: string
  email: string
}

export interface IUserContext {
  isAuth: boolean
  user: UserContextInfo
  login: () => void
  logout: () => void
}

export const UserContext = createContext<IUserContext>({
  isAuth: false,
  user: { token: '', email: '' },
  login: () => {},
  logout: () => {}
})
