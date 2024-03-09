import baseInstance from './api'
import {
  resetUser,
  storeAccessToken,
  storeRefreshToken,
  storeUserID,
} from './storage'

const userSuffix = '/users'

export const registerUser = async data => {
  try {
    const response = await baseInstance.post(`${userSuffix}/register`, {
      ...data,
      membershipType: 'UNPAID',
    })
    return response.status
  } catch (error) {
    console.error('Registration failed:', error.response.data)
  }
}

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
    if (error.response.status === '401') {
      await resetUser()
    }
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

export const geUsersInfo = async () => {
  try {
    return await baseInstance.get(`${userSuffix}`)
  } catch (error) {
    console.error('Get Information failed:', error)
  }
}

export const editUserInfo = async (userId, updatedInfo) => {
  try {
    const response = await baseInstance.put(
      `${userSuffix}/edit/${userId}`,
      updatedInfo
    )
    console.log('the user info response', response)
    return response
  } catch (error) {
    console.error('Edit User Information failed:', error)
  }
}

export const deleteUser = async userId => {
  try {
    return await baseInstance.delete(`${userSuffix}/${userId}`)
  } catch (error) {
    console.error('Get Information failed:', error)
  }
}
