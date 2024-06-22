import { AxiosResponse } from 'axios'
import { api } from '../../../lib/axios'
import { FormAndLatestTests } from '../interfaces'

export const updateForm = async ({
  token,
  userId,
  formData,
}: {
  token: string
  userId: number
  formData: FormAndLatestTests
}): Promise<void> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  }

  await api.put(`/data/form/${userId}`, formData, {
    headers,
  })
}

export const getFormAndLatestTests = async ({
  token,
  userId,
}: {
  token: string
  userId: number
}): Promise<FormAndLatestTests> => {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  }

  const response: AxiosResponse<{ content: { data: FormAndLatestTests } }> =
    await api.get(`/data/form-and-latest-tests/${userId}`, { headers })

  return response.data.content.data
}
