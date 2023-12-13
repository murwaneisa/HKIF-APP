import { setUser } from '../Slices/userSlice'
import { loginUser, getFullUserInfoByID, googleLogin } from '../../Axios/user'

export const loginAndSetUser = (email, password) => async dispatch => {
  try {
    const userId = await loginUser(email, password)
    const user = await getFullUserInfoByID(userId)
    dispatch(setUser(user))
  } catch (error) {
    console.error('Executing loginAndSetUser failed:' + error)
  }
}

export const loginAndSetUserWithGoogle =
  (clientId, idToken) => async dispatch => {
    try {
      const userId = await googleLogin(clientId, idToken)
      const user = await getFullUserInfoByID(userId)
      dispatch(setUser(user))
    } catch (error) {
      console.error('Executing loginAndSetUserWithGoogle failed:', error)
    }
  }
