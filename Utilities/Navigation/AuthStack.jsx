import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Splash from '../../Screens/Splash'
import Welcome from '../../Screens/Welcome'
import Login from '../../Screens/Login'
import Register from '../../Screens/Register'
import HeaderLeft from '../../Components/Navigation/HeaderLeft'
import StackNavigator from '../../Components/Navigation/StackNavigator'

const AuthStack = () => {
  const Stack = createStackNavigator()
  return (
    <StackNavigator headerLeft={() => HeaderLeft()}>
      <Stack.Screen
        name='Splash'
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Welcome'
        component={Welcome}
        options={{ headerLeft: () => null, headerShown: false }}
      />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
    </StackNavigator>
  )
}

export default AuthStack
