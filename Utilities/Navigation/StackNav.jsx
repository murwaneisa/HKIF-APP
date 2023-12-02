import { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import AuthStack from './AuthStack'
import AppStack from './AppStack'
import AdminStack from './AdminStack'

const Drawer = createDrawerNavigator()

export default function StackNav() {
  const [isAuthenticated, setIsAuthenticated] = useState('user')
  let stackToRender

  if (isAuthenticated === 'admin') {
    stackToRender = <AdminStack />
  } else if (isAuthenticated === 'user') {
    stackToRender = <AppStack />
  } else {
    stackToRender = <AuthStack />
  }

  return <NavigationContainer>{stackToRender}</NavigationContainer>
}
