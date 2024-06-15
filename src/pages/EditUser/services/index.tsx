import { api } from '../../../lib/axios'
import { GetUserResponse, EditPasswordPayload, DeleteResponse } from '../interfaces/index'


export const getUser = async (userId: number | null): Promise<GetUserResponse> => {
  
  
  const response = await api.get<GetUserResponse>(`/user/users/${userId}`,  {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  
  return response.data
    
}

export const deleteAccount = async (userId: number | null, token: string): Promise<DeleteResponse> => {
  
  
  const response = await api.delete(`/user/users/${userId}`,  {
    headers: {
      Authorization: `Bearer${token}`
    },
  })

  
  return response.data
    
}

export const editPassword = async (userId: number | null, payload:EditPasswordPayload): Promise<GetUserResponse> => {
  
  
  const response = await api.put(`/user/users/${userId}`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  
  return response.data
    
}
