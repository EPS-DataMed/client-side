import { api } from '../../../lib/axios'
import { LoginResponse } from '../interfaces'
import { LoginFormData } from '../schema'

export const login = async (data: LoginFormData): Promise<LoginResponse> => {
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
