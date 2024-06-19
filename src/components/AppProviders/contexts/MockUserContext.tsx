import { useState } from 'react'
import { createContext, useContext } from 'use-context-selector'
import { User } from '../../../contexts/UserContext'

const mockUser: User = {
  full_name: 'Mock User',
  email: 'mockuser@example.com',
  birth_date: '1990-01-01',
  biological_sex: 'Male',
  id: 1,
  creation_date: '2020-01-01',
  password: 'password123',
  doctor: {
    crm: '123456',
    specialty: 'Cardiology',
    user_id: 1,
  },
}

export const MockUserContext = createContext({} as any)

export function MockUserProvider({ children }: any) {
  const [user, setUser] = useState<User>(mockUser)

  return (
    <MockUserContext.Provider
      value={{
        user,
        setUser,
        isUserExists: true,
        userAge: 18,
        isDoctor: true,
      }}
    >
      {children}
    </MockUserContext.Provider>
  )
}

export function useMockUserContext() {
  return useContext(MockUserContext)
}
