import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../contexts/UserContext'
import { hasObjectValidKeys } from '../../interfaces/typeGuards'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { getUser } = useUserContext()
  const navigate = useNavigate()

  const user = getUser()
  const isUserExist = hasObjectValidKeys(user)

  useEffect(() => {
    if (!isUserExist) {
      navigate('/')
    }
  }, [isUserExist, navigate])

  return isUserExist ? children : null
}

export default ProtectedRoute
