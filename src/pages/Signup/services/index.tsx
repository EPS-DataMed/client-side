import { api } from '../../../lib/axios'

interface CreateUserPayload {
  nome_completo: string
  email: string
  data_nascimento: string
  sexo_biologico: string
  formulario: object
  status_formulario: string
  senha: string
}

export const createUser = async (payload: CreateUserPayload) => {
  const response = await api.post('/user/users', payload, {
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
