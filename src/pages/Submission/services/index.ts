import { AxiosResponse } from 'axios'
import { api } from '../../../lib/axios'
import { DeleteResponse, Exam } from '../interfaces'

export const uploadFiles = async (
  userId: number,
  files: File[],
  token?: string,
): Promise<any> => {
  const formData = new FormData()
  files.forEach((file) => {
    formData.append('files', file)
  })

  const headers: Record<string, string> = {
    'Content-Type': 'multipart/form-data',
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response: AxiosResponse<any> = await api.post(
    `/data/upload/${userId}`,
    formData,
    { headers },
  )

  return response.data
}

export const deleteFile = async (
  userId: number,
  fileId: number,
  token?: string,
): Promise<DeleteResponse> => {
  const headers: Record<string, string> = {}
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response: AxiosResponse<DeleteResponse> = await api.delete(
    `/data/delete/${userId}/${fileId}`,
    { headers },
  )

  return response.data
}

export const getExams = async (
  userId: number,
  token?: string,
): Promise<Exam[]> => {
  const headers: Record<string, string> = {}
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response: AxiosResponse<Exam[]> = await api.get(
    `/data/tests/${userId}`,
    { headers },
  )

  return response.data
}
