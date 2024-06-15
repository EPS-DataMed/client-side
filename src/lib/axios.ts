import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { ErrorToast } from '../components/Toast'

const baseURL = 'https://gateway-vctd.onrender.com'
const uploadURL = 'https://data-processing-service.onrender.com'

export const api = axios.create({
  baseURL,
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
  baseURL: uploadURL,
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
