import { api } from '../../../lib/axios'

export const uploadFiles = async (files: File[], id: number): Promise<any> => {
  const formData = new FormData()
  files.forEach((file) => {
    formData.append('files', file)
  })

  const response = await api.post(`/data/upload/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
