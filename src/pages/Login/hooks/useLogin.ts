import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { LoginFormData } from '../schema'
import { api } from '../../../lib/axios'
import { LoginResponse } from '../interfaces'
import { saveCookie } from '../../../utils/cookies'
import useNavigation from '../../../hooks/useNavigation'
import { ErrorToast } from '../../../components/Toast'

interface JwtPayload {
  user_id: number
  exp: number
  iat: number
}

function decodeJwt(token: string): JwtPayload {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(''),
  )

  return JSON.parse(jsonPayload)
}

export const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const navigateTo = useNavigation()

  const login = async (data: LoginFormData): Promise<LoginResponse> => {
    const params = new URLSearchParams()
    params.append('username', data.email)
    params.append('password', data.password)

    const response = await api.post<LoginResponse>('/auth/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    return response.data
  }

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setLoading(true)
    try {
      const response = await login(data)
      const decodedToken = decodeJwt(response.content.access_token)
      const userId = decodedToken.user_id
      saveCookie('access_token', response.content.access_token, 1)
      navigateTo(`home/${userId}`)
    } catch (error) {
      ErrorToast(
        'Verifique suas informações novamente! Ou tente novamente mais tarde.',
      )
    } finally {
      setLoading(false)
    }
  }

  return { loading, onSubmit }
}
