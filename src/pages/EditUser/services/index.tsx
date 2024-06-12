import { api } from '../../../lib/axios'
import { GetUserResponse } from '../interfaces/index'


export const getUser = async (userId: string): Promise<GetUserResponse> => {
  
  
  const response = await api.get<GetUserResponse>(`/user/users/${userId}`,  {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  
  return response.data
    
}
