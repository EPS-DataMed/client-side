import { AxiosResponse } from 'axios'
import { api, uploadApi } from '../../../lib/axios'
import {
  DeleteResponse,
  Exam,
  RequestDeleteFile,
  RequestExams,
  RequestUploadProps,
} from '../interfaces'
import { Dependent } from '../../ManagerUsers/interfaces'
import { FormAndLatestTests } from '../../UserForm/interfaces'

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

export const getDependents = async ({
  token,
  userId,
  dependentId,
}: {
  token: string
  userId: number
  dependentId: string
}): Promise<Dependent> => {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  }

  const response: AxiosResponse<{ content: Dependent }> = await api.get(
    `/user/dependents/${userId}/${dependentId}`,
    { headers },
  )

  return response.data.content
}

export const processExams = async ({
  token,
  userId,
  examIndexes,
}: {
  token: string
  userId: number
  examIndexes: number[]
}): Promise<FormAndLatestTests> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  }

  const response: AxiosResponse<{ content: { data: FormAndLatestTests } }> =
    await api.post(`/data/tests-processing/${userId}`, examIndexes, { headers })

  return response.data.content.data
}
