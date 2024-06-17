import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { ErrorToast } from '../components/Toast'

const BASE_URL = 'https://gateway-vctd.onrender.com'
const UPLOAD_URL = 'https://file-manager-iuhn.onrender.com'
const TERM_URL = 'https://terms-qynk.onrender.com/'

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
