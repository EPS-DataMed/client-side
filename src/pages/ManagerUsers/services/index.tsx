import { api } from '../../../lib/axios'
import {
  Dependent,
  RequestListDependents,
  RequestDeleteDependent,
  RequestConfirmDependent,
} from '../interfaces'

interface ResponseListDependents {
  content: Dependent[]
}

export const listUserDependents = async ({
  userId,
  token,
}: RequestListDependents): Promise<Dependent[]> => {
  const response = await api.get<ResponseListDependents>(
    `/user/dependents/${userId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.data.content || []
}

export const deleteUserDependent = async ({
  userId,
  dependentId,
  token,
}: RequestDeleteDependent): Promise<void> => {
  await api.delete(`/user/dependents/${userId}/${dependentId}`, {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

export const confirmUserDependent = async ({
  userId,
  email,
  token,
}: RequestConfirmDependent): Promise<void> => {
  await api.post(
    `/user/dependents/confirm/${userId}`,
    { email },
    {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
