import { User } from '../../../contexts/UserContext'
import { api } from '../../../lib/axios'

export const getUserWithDoctor = async ({
  token,
  userId,
}: {
  token: string
  userId: number
}): Promise<User> => {
  const response = await api.get(`/user/users/with-doctor/${userId}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data.content
}
