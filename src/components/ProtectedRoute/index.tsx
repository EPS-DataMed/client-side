import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCookie } from '../../utils/cookies'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = getCookie('access_token')
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [navigate, token])

  return token ? children : null
}

export default ProtectedRoute
