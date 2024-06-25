import { User } from '../../../contexts/UserContext'
import { authApi, userApi } from '../../../lib/axios'

export interface CreateDependentRequest {
  dependent_id: number
  confirmed: boolean
  user_id: number
}

export interface CreateDependentResponse {
  dependent_id: number
  confirmed: boolean
  user_id: number
}

export const createDependent = async (
  data: CreateDependentRequest,
): Promise<void> => {
  await userApi.post<CreateDependentResponse>('/user/dependents/', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const getUserWithDoctor = async ({
  userId,
}: {
  userId: number
}): Promise<User> => {
  const response = await userApi.get(`/user/users/with-doctor/${userId}`, {
    headers: {
      accept: 'application/json',
    },
  })

  return response.data
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
