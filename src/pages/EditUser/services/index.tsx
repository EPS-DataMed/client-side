import { api } from '../../../lib/axios'
import { GetUserResponse, EditPasswordPayload, DeleteResponse } from '../interfaces/index'
import { getCookie } from '../../../utils/cookies'

export const getUser = async (userId: number | null): Promise<GetUserResponse> => {
  
  const token = getCookie('access_token')
  
  const response = await api.get<GetUserResponse>(`/user/users/${userId}`,  {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
  })

  
  return response.data
    
}

export const deleteAccount = async (userId: number | null): Promise<DeleteResponse> => {
  
  const token = getCookie('access_token')

  const response = await api.delete(`/user/users/${userId}`,  {
    headers: {
      Authorization: `Bearer${token}`
    },
  })

  
  return response.data
    
}

export const editPassword = async (userId: number | null, payload:EditPasswordPayload): Promise<any> => {
  console.log('payload ',payload)
  const token = getCookie('access_token')
  
  const response = await api.put(`/user/users/${userId}`, {"password": payload.password}, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  })

  
  return response.data
    
}
