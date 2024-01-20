import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack'
import UserStack from './UserStack'
import AdminStack from './AdminStack'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAndSetUser } from '../Redux/Actions/userActions'
import { getAccessToken, getUserID } from '../Axios/token'
import { checkAndSetAdmin } from '../Redux/Actions/adminActions'

export default function StackNav() {
  const user = useSelector(state => state.user.currentUser)
  const admin = useSelector(state => state.admin.currentAdmin)
  const dispatch = useDispatch()

  useEffect(() => {
    async function autoLogin() {
      const accessToken = await getAccessToken()
      if (accessToken) {
        const userId = await getUserID()
        dispatch(checkAndSetUser(userId))
        dispatch(checkAndSetAdmin(userId))
      }
    }
    autoLogin()
  }, [dispatch])

  let stackToRender

  if (user) {
    stackToRender = <UserStack />
  } else if (admin) {
    stackToRender = <AdminStack />
  } else {
    stackToRender = <AuthStack />
  }

  return <NavigationContainer>{stackToRender}</NavigationContainer>
}
