import baseInstance from './api'
import { storeAccessToken, storeRefreshToken, storeToken } from './token'

const userSuffix = '/users'

export const loginUser = async (email, password) => {
  try {
    const response = await baseInstance.post(`${userSuffix}/login`, {
      email,
      password,
    })
    const { access, refresh } = response.data
    await storeAccessToken(access)
    await storeRefreshToken(refresh)
  } catch (error) {
    console.error('Login failed:', error)
  }
}

export const getFullUserInfoByID = async userId => {
  try {
    const response = await baseInstance.get(`${userSuffix}/${userId}`)
    return response.data
  } catch (error) {
    console.error('Get Information failed:', error)
  }
}
