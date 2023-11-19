import { setAdmin } from '../Slices/adminSlice'
import { loginAdmin, getFullAdminInfoByID } from '../../Axios/admin'

export const loginAndSetAdmin = (email, password) => async dispatch => {
  try {
    const adminId = await loginAdmin(email, password)
    const admin = await getFullAdminInfoByID(adminId)
    dispatch(setAdmin(admin))
  } catch (error) {
    console.error('Executing loginAndSetAdmin failed:' + error.message)
  }
}
