import { api } from '../../../lib/axios'

interface ForgotPasswordResponse {
  message: string
}

interface ForgotPasswordData {
  email: string
}

export const forgotPassword = async (
  data: ForgotPasswordData,
): Promise<ForgotPasswordResponse> => {
  const response = await api.post<ForgotPasswordResponse>(
    '/auth/forgot-password',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  return response.data
}
