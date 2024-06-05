import axios from 'axios';
//import dotenv from 'dotenv'
//dotenv.config()
//const PORT = process.env.PORT || 8080
const PORT = 8000
export const axiosInstance = axios.create({
    baseURL: `http://localhost:${PORT}`,
});