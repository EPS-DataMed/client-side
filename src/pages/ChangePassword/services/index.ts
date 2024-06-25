import { api, authApi } from '../../../lib/axios'

interface UpdatePassword {
  userId: number
  password: string
}

export const updatePassword = async ({ password, userId }: UpdatePassword) => {
  await api.put(`/auth/users/${userId}/password`, {
    password,
  })
}

export const validateEmailToken = async (
  token: string,
): Promise<{ is_valid: boolean }> => {
  const response = await authApi.post<{ is_valid: boolean }>(
    `/auth/validation-email-token?token=${token}`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    },
  )
  return response.data
}
