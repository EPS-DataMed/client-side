import { api } from '../../../lib/axios'

interface UpdatePassword {
  userId: number
  password: string
}

export const updatePassword = async ({ password, userId }: UpdatePassword) => {
  await api.put(`/auth/users/${userId}/password`, {
    password,
  })
}
