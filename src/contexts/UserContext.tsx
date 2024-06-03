import { ReactNode, useCallback, useState } from 'react'
import { createContext, useContext } from 'use-context-selector'

interface UserContextType {
  user: any
  setUser: (user: any) => void
  getUser: () => any
}

interface UserProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextType)

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUserState] = useState<any>(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : {}
  })

  const setUser = useCallback((user: any) => {
    setUserState(user)
    localStorage.setItem('user', JSON.stringify(user))
  }, [])

  const getUser = useCallback(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : {}
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}
