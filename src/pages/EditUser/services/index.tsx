import { api } from '../../../lib/axios'
import { GetUserResponse, DeleteResponse } from '../interfaces/index'
import { getCookie } from '../../../utils/cookies'
import { EditFormData } from '../schema'
import { string } from 'zod'

export const getUser = async (
  userId: number | null,
): Promise<GetUserResponse> => {
  const token = getCookie('access_token')

  const response = await api.get<GetUserResponse>(`/user/users/${userId}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

export const deleteAccount = async (
  userId: number | null,
): Promise<DeleteResponse> => {
  const token = getCookie('access_token')

  const response = await api.delete(`/user/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })

  return response.data
}

interface EditPasswordPayload {
  old_password: string
  new_password: string
}
export const editPassword = async (
  userId: number | null,
  payload: EditPasswordPayload,
): Promise<any> => {
  console.log('payload ', payload)
  const token = getCookie('access_token')

  const response = await api.patch(
    `/user/users/${userId}/password`,
    null,
    {
      params:payload,
      headers: {
        Authorization: `Bearer ${token}`
      },
    },
  )

  return response.data
}
