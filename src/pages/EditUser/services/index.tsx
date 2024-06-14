import { api } from '../../../lib/axios'
import { GetUserResponse, EditPasswordPayload } from '../interfaces/index'


export const getUser = async (userId: number | null): Promise<GetUserResponse> => {
  
  
  const response = await api.get<GetUserResponse>(`/user/users/${userId}`,  {
    headers: {
      'Content-Type': 'application/json',
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
