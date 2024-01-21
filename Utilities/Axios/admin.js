import baseInstance from './api'
import {
  resetUser,
  storeAccessToken,
  storeRefreshToken,
  storeUserID,
} from './storage'

const adminSuffix = '/admins'

export const loginAdmin = async (email, password) => {
  try {
    const response = await baseInstance.post(`${adminSuffix}/login`, {
      email,
      password,
    })
    const { adminId, access, refresh } = response.data
    await storeAccessToken(access)
    await storeRefreshToken(refresh)
    await storeUserID(adminId)
    return adminId
  } catch (error) {
    console.error('Admin Login failed:\n', JSON.stringify(error))
  }
}

export const getFullAdminInfoByID = async adminId => {
  try {
    const response = await baseInstance.get(`${adminSuffix}/${adminId}`)
    return response.data
  } catch (error) {
    if (error.response.status === '401') {
      await resetUser()
    }
    console.error('Admin Get Information failed:', JSON.stringify(error))
  }
}
