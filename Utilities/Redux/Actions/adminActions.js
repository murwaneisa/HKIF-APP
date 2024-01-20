import { logoutAdmin, setAdmin } from '../Slices/adminSlice'
import { loginAdmin, getFullAdminInfoByID } from '../../Axios/admin'
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
