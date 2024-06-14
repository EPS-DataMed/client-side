import { api } from '../../../lib/axios'

interface CreateUserPayload {
  full_name: string
  email: string
  birth_date: string
  biological_sex: string
  password: string
}

export const createUser = async (payload: CreateUserPayload) => {
  const response = await api.post('/auth/users', payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data
}

interface CreateDoctorPayload {
  crm: string
  specialty: string
  user_id: number
}

export const createDoctor = async (payload: CreateDoctorPayload) => {
  const response = await api.post('/auth/doctors', payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data
}
