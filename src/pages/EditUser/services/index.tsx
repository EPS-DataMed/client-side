import { api } from '../../../lib/axios'
import { GetUserResponse, DeleteResponse } from '../interfaces/index'
import { getCookie } from '../../../utils/cookies'
import { EditFormData } from '../schema'
import { string } from 'zod'

export const getUser = async (
  userId: number | null,
): Promise<GetUserResponse> => {
  const token = getCookie('access_token')

  const response = await api.get<GetUserResponse>(`/user/users/${userId}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

interface DeleteAccountPayload {
  password: string
}

export const deleteAccount = async (
  userId: number | null,
  sendDeleteRequest: boolean,
  payload: DeleteAccountPayload
): Promise<DeleteResponse> => {
  const token = getCookie('access_token')

  var url = null

  if(sendDeleteRequest){
    url = `/user/users/${userId}`

    var response = await api.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

  }
  else{
    url = `/auth/users/${userId}/compare-password`

    var response = await api.post(url, 
      payload,  
      {
        headers: {
          Accept: 'application/json',
        },
      })

  }
  
  

  return response.data
}

interface EditPasswordPayload {
  old_password: string
  new_password: string
}
export const editPassword = async (
  userId: number | null,
  payload: EditPasswordPayload,
): Promise<any> => {
  console.log('payload ', payload)
  const token = getCookie('access_token')

  const response = await api.patch(
    `/user/users/${userId}/password`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
    },
  )

  return response.data
}
