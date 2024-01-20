import { setUser } from '../Slices/userSlice'
import { loginUser, getFullUserInfoByID } from '../../Axios/user'

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
  const user = await getFullUserInfoByID(userId)
  if (user) {
    dispatch(setUser(user))
  }
}
