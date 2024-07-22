import axios from "axios"
import { HttpError } from "../../modals/HTTPError"

export const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
})



function httpErrorHandler(error) {
  if (error === null) throw new Error('Unrecoverable error!! Error is null!')
  if (axios.isAxiosError(error)) {

    const response = error?.response
    const request = error?.request
    const config = error?.config

    if (error.code === 'ERR_NETWORK') {
      throw new Error('Unable to connect with the backend')
    } else if (error.code === 'ERR_CANCELED') {
      throw new Error('connection CANCELED. please try later.')
    }
    // if (response) {
    //   const statusCode = response?.status
    //   if (statusCode === 404) {
    //   } else if (statusCode === 401) {
    //   }
    // } else if (request) {
    // }
  }
  console.log(error.message)
}

function responseHandler(response) {

  console.log(response);

  const config = response?.config
  if (config.raw) {
    return response
  }
  if (response.status == 200 || response.status == 201) {
    const data = response.data
    if (!data) {
      throw new HttpError('API Error. No data!')
    }
    return data
  }
  throw new HttpError('API Error! Invalid status code!')
}

function responseErrorHandler(response) {
  const config = response?.config
  if (config.raw) {
    return response
  }
  return httpErrorHandler(response)
}


api.interceptors.response.use(responseHandler, responseErrorHandler)




