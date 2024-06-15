import { AxiosResponse } from 'axios'
import { api } from '../../../lib/axios'
import {
  DeleteResponse,
  Exam,
  RequestDeleteFile,
  RequestExams,
  RequestUploadProps,
} from '../interfaces'

export const uploadFiles = async ({
  files,
  token,
  userId,
}: RequestUploadProps): Promise<any> => {
  const formData = new FormData()
  files.forEach((file) => {
    formData.append('files', file)
  })

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  }

  const response = await api.post(`/data/upload/${userId}`, formData, {
    headers,
  })

  return response.data
}

export const deleteFile = async ({
  userId,
  token,
  fileId,
}: RequestDeleteFile): Promise<DeleteResponse> => {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  }

  const response: AxiosResponse<DeleteResponse> = await api.delete(
    `/data/delete/${userId}/${fileId}`,
    { headers },
  )

  return response.data
}

export const getExams = async ({
  token,
  userId,
}: RequestExams): Promise<Exam[]> => {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  }

  const response: AxiosResponse<any> = await api.get(`/data/tests/${userId}`, {
    headers,
  })

  return response.data.data || response.data.content.data
}
