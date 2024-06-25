import { api, privacyApi, termApi } from '../../../lib/axios'

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

interface GenerateTermsPayload {
  projectName: string
  contactEmail: string
}

export const generateTerms = async ({
  contactEmail,
  projectName,
}: GenerateTermsPayload) => {
  const response = await termApi.post(
    '/term/generate',
    new URLSearchParams({
      project_name: projectName,
      contact_email: contactEmail,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      responseType: 'blob',
    },
  )
  return response.data
}

export const generatePrivacy = async ({
  contactEmail,
  projectName,
}: GenerateTermsPayload) => {
  const response = await privacyApi.post(
    '/privacy/generate',
    new URLSearchParams({
      project_name: projectName,
      contact_email: contactEmail,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      responseType: 'blob',
    },
  )
  return response.data
}
