import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack'
import UserStack from './UserStack'
import AdminStack from './AdminStack'
import { useSelector } from 'react-redux'

export default function StackNav() {
  const user = useSelector(state => state.user.currentUser)
  const admin = useSelector(state => state.admin.currentAdmin)
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
