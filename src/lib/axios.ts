import axios from 'axios'
import { ErrorToast } from '../components/Toast'

const BASE_URL = import.meta.env.VITE_BASE_URL
const UPLOAD_URL = import.meta.env.VITE_UPLOAD_URL
const TERM_URL = import.meta.env.VITE_TERM_URL
export const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY
export const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY

export const api = axios.create({
  baseURL: BASE_URL,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      ErrorToast(
        'Sua sessão expirou. Você será redirecionado para a página inicial.',
      )
      setTimeout(() => {
        window.location.href = '/'
      }, 3000)
    }
    return Promise.reject(error)
  },
)

export const uploadApi = axios.create({
  baseURL: UPLOAD_URL,
})

uploadApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      ErrorToast(
        'Sua sessão expirou. Você será redirecionado para a página inicial.',
      )
      setTimeout(() => {
        window.location.href = '/'
      }, 3000)
    }
    return Promise.reject(error)
  },
)

export const termApi = axios.create({
  baseURL: TERM_URL,
})
