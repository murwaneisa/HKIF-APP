import axios from 'axios'
import { API_URL } from '@env'
import { getAccessToken, storeAccessToken, getRefreshToken } from './token'

const baseInstance = axios.create({
  baseURL: API_URL,
})

baseInstance.interceptors.request.use(
  async config => {
    const token = await getAccessToken()
    const refreshToken = await getRefreshToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
      config.headers['x-refresh-token'] = `${refreshToken}`
    }
    return config
  },
  error => {
    // Handle request error
    return Promise.reject(error)
  }
)

// Response Interceptor
baseInstance.interceptors.response.use(
  async response => {
    const newAccessToken = response.headers['x-new-access-token']
    if (newAccessToken) {
      await storeAccessToken(newAccessToken)
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default baseInstance
