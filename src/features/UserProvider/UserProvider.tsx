import React from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '@/shared/const'
import { IS_AUTH_KEY, USER_INFO_KEY } from '@/shared/lib/const'
import { UserContext, type UserContextInfo } from '@/shared/lib/contexts'
import { useLocalStorage } from '@/shared/lib/hooks'

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const { value: isAuth, setValue: setIsAuth } = useLocalStorage(IS_AUTH_KEY, false)
  const { value: user, setValue: setUser } = useLocalStorage<UserContextInfo>(USER_INFO_KEY, {
    token: '',
    email: ''
  })

  const login = (userInfo: UserContextInfo) => {
    setIsAuth(true)
    setUser({ ...userInfo })
    navigate(routes.root())
  }

  const logout = () => {
    setIsAuth(false)
    setUser({
      token: '',
      email: ''
    })
    navigate(routes.login())
  }

  return <UserContext.Provider value={{ isAuth, user, login, logout }}>{children}</UserContext.Provider>
}
