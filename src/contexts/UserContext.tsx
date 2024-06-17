import { ReactNode, useMemo, useState } from 'react'
import { createContext, useContext } from 'use-context-selector'
import { hasObjectValidKeys } from '../interfaces/typeGuards'

export interface Doctor {
  crm: string
  specialty: string
  user_id: number
}

export interface User {
  full_name: string
  email: string
  birth_date: string
  biological_sex: string
  id: number
  creation_date: string
  password: string
  doctor: Doctor
}

interface UserContextType {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  isUserExists: boolean
  isDoctor: boolean
  userAge: number
}

interface UserProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextType)

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>({} as User)

  const userAge = useMemo(() => {
    const birthDate = new Date(user.birth_date)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--
    }
    return age
  }, [user.birth_date])

  const isUserExists = hasObjectValidKeys(user)
  const isDoctor = hasObjectValidKeys(user.doctor)

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isUserExists,
        userAge,
        isDoctor,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}
