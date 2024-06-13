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
  especialidade: string
  id_usuario: number
}

export const createDoctor = async (payload: CreateDoctorPayload) => {
  const response = await api.post('/user/doctors', payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data
}
