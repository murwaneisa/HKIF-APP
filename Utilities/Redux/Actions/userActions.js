import { logoutUser, setUser } from '../Slices/userSlice'
import { loginUser, getFullUserInfoByID, registerUser } from '../../Axios/user'
import { resetUser } from '../../Axios/storage'

export const registerAndLoginUser = data => async dispatch => {
  try {
    const status = await registerUser(data)
    if (status === 201) {
      const userId = await loginUser(data.email, data.password)
      const user = await getFullUserInfoByID(userId)
      dispatch(setUser(user))
    }
  } catch (error) {
    console.error('Executing registration failed:' + error)
  }
}

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
