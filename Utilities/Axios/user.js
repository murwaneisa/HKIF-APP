import baseInstance from './api'
import { storeAccessToken, storeRefreshToken, storeUserID } from './storage'

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
    await storeUserID(userId)
    return userId
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

export const getPublicUsersByID = async userIds => {
  try {
    let users = []
    for (uid of userIds) {
      const response = await baseInstance.get(`${userSuffix}/public/${uid}`)
      users.push(response.data)
    }
    return users
  } catch (error) {
    console.error('Get Information failed:', error)
  }
}
