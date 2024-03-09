import baseInstance from './api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { resetUser, storeAccessToken, storeRefreshToken, storeUserID } from './storage'

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

export const deleteAdmin = async adminId => {
  try {
    const response = await baseInstance.delete(`${adminSuffix}/${adminId}`)
    console.log('deleted admin response:', response)
    return response
  } catch (error) {
    console.error('Get Information failed:', error)
  }
}

// Async thunk for updating an admin
export const updateAdminThunk = createAsyncThunk(
  'admins/updateStatus',
  async ({ adminId, updates }, { rejectWithValue }) => {
    try {
      const response = await baseInstance.put(
        `${adminSuffix}/edit/${adminId}`,
        updates
      )
      console.log(
        'the reponse data int eh create thunk function',
        response.data
      )
      return response.data // Assuming the updated admin data is returned
    } catch (error) {
      console.error('Updating admin failed:', error)
      return rejectWithValue(error.response.data)
    }
  }
)

// Async thunk for deleting an admin
export const deleteAdminThunk = createAsyncThunk(
  'admins/deleteStatus',
  async (adminId, { rejectWithValue }) => {
    try {
      const response = await baseInstance.delete(`${adminSuffix}/${adminId}`)
      return adminId // Return the adminId to identify which admin was deleted
    } catch (error) {
      console.error('Deleting admin failed:', error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const registerAdminThunk = createAsyncThunk(
  'admin/registerStatus',
  async (info, { rejectWithValue }) => {
    try {
      const response = await baseInstance.post(`${adminSuffix}/register`, info)
      return response.data
    } catch (error) {
      console.error('register admin failed:', error)
      return rejectWithValue(
        error.response ? error.response.data : error.message
      )
    }
  }
)
