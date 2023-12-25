import { setUser, publicUsersInfo } from '../Slices/userSlice'
import {
  loginUser,
  getFullUserInfoByID,
  getPublicUsersByID,
} from '../../Axios/user'

export const loginAndSetUser = (email, password) => async dispatch => {
  try {
    const userId = await loginUser(email, password)
    const user = await getFullUserInfoByID(userId)
    dispatch(setUser(user))
  } catch (error) {
    console.error('Executing loginAndSetUser failed:' + error)
  }
}

export const fetchPublicUsersById = userIds => async dispatch => {
  try {
    const data = await getPublicUsersByID(userIds)
    dispatch(publicUsersInfo(data))
  } catch (error) {
    console.error('Executing fetchPublicUserById failed:' + error)
  }
}
