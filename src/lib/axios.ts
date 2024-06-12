import axios from 'axios'

const baseURL = 'https://gateway-zhl1.onrender.com'

export const api = axios.create({
  baseURL,
})
