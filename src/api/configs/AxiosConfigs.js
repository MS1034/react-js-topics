import axios from "axios"

export const api = axios.create({
  // withCredentials: true,
  baseURL: 'http://localhost:5000/api/v1',
})

// custom error handler
const errorHandler = (error) => {
  const statusCode = error.response?.status
  if (statusCode && statusCode !== 401) {
    console.error(error)
  }
  return Promise.reject(error)
}

// error handling interceptor for response
api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error)
})