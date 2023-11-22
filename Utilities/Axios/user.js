import baseInstance from './api'
import { storeAccessToken, storeRefreshToken } from './token'

const userSuffix = '/users'

export const loginUser = async (email, password) => {
  try {
    const response = await baseInstance.post(`${userSuffix}/login`, {
      email,
      password,
    })
    const { userId, access, refresh } = response.data
    await storeAccessToken(access)
    await storeRefreshToken(refresh)
    return userId
  } catch (error) {
    console.error('User Login failed:', JSON.stringify(error))
  }
}

export const getFullUserInfoByID = async userId => {
  try {
    const response = await baseInstance.get(`${userSuffix}/${userId}`)
    return response.data
  } catch (error) {
    console.error('User Get Information failed:', JSON.stringify(error))
  }
}

export const registerUser = async userData => {
  try {
    const response = await baseInstance.post(`${userSuffix}/register`, userData)
    return response.data
  } catch (error) {
    console.error('User Registration failed:', JSON.stringify(error))
    throw error
  }
}
