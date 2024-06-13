import axios from 'axios'

const baseURL = 'https://data-processing-service.onrender.com/'

export const api = axios.create({
  baseURL,
})
