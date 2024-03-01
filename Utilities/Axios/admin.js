import baseInstance from './api'
import { storeAccessToken, storeRefreshToken, storeUserID } from './storage'

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
    console.error('Admin Get Information failed:', JSON.stringify(error))
  }
}

export const fetchAdmins = async () => {
  try {
    return await baseInstance.get(`${adminSuffix}`)
  } catch (error) {
    console.error('Get Information failed:', error)
  }
}

export const updateAdmin = async (id, updates) => {
  try {
    const response = await baseInstance.put(
      `${adminSuffix}/edit/${id}`,
      updates
    )
    return response
  } catch (error) {
    console.error('Get Information failed:', error)
  }
}

export const registerAdmin = async info => {
  console.log('the admin information ', info)
  try {
    const response = await baseInstance.post(`${adminSuffix}/register`, info)
    return response
  } catch (error) {
    console.error('Get Information failed:', error)
  }
}

export const deleteAdmin = async adminId => {
  try {
    const response = await baseInstance.delete(`${adminSuffix}/${adminId}`)
    console.log('deleted admin response:', response)
    return response
  } catch (error) {
    console.error('Get Information failed:', error)
  }
}
