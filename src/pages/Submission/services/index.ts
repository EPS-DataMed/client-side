import { AxiosResponse } from 'axios'
import { api, uploadApi } from '../../../lib/axios'
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
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`,
  }

  const response = await uploadApi.post(`/file/upload/${userId}`, formData, {
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
    `/file/delete/${userId}/${fileId}`,
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

  const response: AxiosResponse<any> = await api.get(`/file/tests/${userId}`, {
    headers,
  })

  return response.data.data || response.data.content.data
}
