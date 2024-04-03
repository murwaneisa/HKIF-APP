import {
  loginUser,
  getFullUserInfoByID,
  registerUser,
  editUserInfo,
  deleteUser,
} from '../../Axios/user'
import { logoutUser, setUser, setUsers } from '../Slices/userSlice'
import { resetUser } from '../../Axios/storage'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const registerAndLoginUser = createAsyncThunk(
  'user/registerAndLoginUser',
  async (_, thunkAPI) => {
    try {
      const data = thunkAPI.getState().registration
      console.log(data)
      const status = await registerUser(data)
      if (status === 201) {
        const userId = await loginUser(data.email, data.password)
        const user = await getFullUserInfoByID(userId)
        return user
      } else {
        return thunkAPI.rejectWithValue('Registration failed')
      }
    } catch (error) {
      console.error('Executing registration failed: ' + error)
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const loginAndSetUser = (email, password) => async dispatch => {
  try {
    const userId = await loginUser(email, password)
    const user = await getFullUserInfoByID(userId)
    dispatch(setUser(user))
  } catch (error) {
    console.error('Executing loginAndSetUser failed:' + error)
  }
}

export const checkIfUserIsLoggedIn = userId => async dispatch => {
  try {
    const user = await getFullUserInfoByID(userId)
    if (user) {
      dispatch(setUser(user))
    }
  } catch (error) {
    console.error(error)
  }
}

export const userLogout = () => async dispatch => {
  try {
    await resetUser()
    dispatch(logoutUser())
  } catch (error) {
    console.error(error)
  }
}

export const addUsers = data => async dispatch => {
  try {
    if (data) {
      dispatch(setUsers(data))
    }
  } catch (error) {
    console.error(error)
  }
}

export const updateAndSetUserInfo = (userId, updatedInfo) => async dispatch => {
  try {
    const response = await editUserInfo(userId, updatedInfo)
    dispatch(setUser(response.data))
  } catch (error) {
    console.error('Failed to update user info:', error)
  }
}

// Async thunk for deleting an admin
export const deleteUserThunk = createAsyncThunk(
  'users/deleteStatus',
  async (userId, { rejectWithValue }) => {
    try {
      await deleteUser(userId)
      return userId // Return the user ID to identify which user was deleted
    } catch (error) {
      console.error('Deleting user failed:', error)
      return rejectWithValue(error.response.data)
    }
  }
)
