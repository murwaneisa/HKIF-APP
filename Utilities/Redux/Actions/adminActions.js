import {
  logoutAdmin,
  setAdmin,
  fetchAdminsSuccess,
  fetchAdminRequest,
  fetchAdminFailure,
  fetchAdmin,
} from '../Slices/adminSlice'
import {
  loginAdmin,
  getFullAdminInfoByID,
  fetchAdmins,
} from '../../Axios/admin'
import { resetUser } from '../../Axios/storage'

export const loginAndSetAdmin = (email, password) => async dispatch => {
  try {
    const adminId = await loginAdmin(email, password)
    const admin = await getFullAdminInfoByID(adminId)
    dispatch(setAdmin(admin))
  } catch (error) {
    console.error('Executing loginAndSetAdmin failed:' + error.message)
  }
}

export const checkAndSetAdmin = adminId => async dispatch => {
  const admin = await getFullAdminInfoByID(adminId)
  if (admin) {
    dispatch(setAdmin(admin))
  }
}

export const adminLogout = () => async dispatch => {
  try {
    await resetUser()
    dispatch(logoutAdmin())
  } catch (error) {
    console.error(error)
  }
}
export const getAdmins = () => async dispatch => {
  try {
    dispatch(fetchAdminRequest())
    const data = await fetchAdmins()
    dispatch(fetchAdminsSuccess(data.data))
  } catch (error) {
    dispatch(fetchAdminFailure(error.message))
  }
}

export const getAdmin = id => async dispatch => {
  try {
    dispatch(fetchAdminRequest())
    const data = await fetchAdmin(id)
    dispatch(fetchAdminsSuccess(data.data))
  } catch (error) {
    dispatch(fetchAdminFailure(error.message))
  }
}
