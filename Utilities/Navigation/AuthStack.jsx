import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Splash from '../../Screens/Splash'
import Welcome from '../../Screens/Welcome'
import LoginForm from '../../Screens/LoginForm'
import Register from '../../Screens/Register'
import HeaderLeft from '../../Components/Navigation/HeaderLeft'

const AuthStack = () => {
  const AuthStack = createStackNavigator()
  return (
    <AuthStack.Navigator initialRouteName='Splash'>
      <AuthStack.Screen
        name='Splash'
        component={Splash}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name='Welcome'
        component={Welcome}
        options={{ headerLeft: () => null, headerShown: false }}
      />
      <AuthStack.Screen
        name='Login Form'
        component={LoginForm}
        options={{ headerLeft: () => HeaderLeft() }}
      />
      <AuthStack.Screen
        name='Register'
        component={Register}
        options={{ headerLeft: () => HeaderLeft() }}
      />
    </AuthStack.Navigator>
  )
}

export default AuthStack
