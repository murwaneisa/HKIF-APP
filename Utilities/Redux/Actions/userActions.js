import { logoutUser, setUser } from '../Slices/userSlice'
import { loginUser, getFullUserInfoByID } from '../../Axios/user'
import { resetUser } from '../../Axios/storage'

export const loginAndSetUser = (email, password) => async dispatch => {
  try {
    const userId = await loginUser(email, password)
    const user = await getFullUserInfoByID(userId)
    dispatch(setUser(user))
  } catch (error) {
    console.error('Executing loginAndSetUser failed:' + error)
  }
}

export const checkAndSetUser = userId => async dispatch => {
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
