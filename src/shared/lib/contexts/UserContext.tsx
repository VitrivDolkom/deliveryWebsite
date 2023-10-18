import { createContext, useContext } from 'react'

export interface UserContextInfo {
  token: string
  email: string
}

export interface IUserContext {
  isAuth: boolean
  user: UserContextInfo
  login: (userInfo: UserContextInfo) => void
  logout: () => void
}

export const UserContext = createContext<IUserContext>({
  isAuth: false,
  user: { token: '', email: '' },
  login: () => {},
  logout: () => {}
})

export const useUserContext = () => useContext(UserContext)
export const useUserSwitcherContext = () => useContext(UserContext)
