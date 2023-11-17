import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Welcome from '../../Screens/Welcome'
import Login from '../../Screens/Login'
import LoginForm from '../../Screens/LoginForm'
import Register from '../../Screens/Register'

const AuthStack = () => {
  const AuthStack = createStackNavigator()
  return (
    <AuthStack.Navigator initialRouteName='Welcome'>
      <AuthStack.Screen
        name='Welcome'
        component={Welcome}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name='Login'
        component={Login}
        options={{ headerLeft: () => null, headerShown: false }}
      />
      <AuthStack.Screen name='Login Form' component={LoginForm} />
      <AuthStack.Screen name='Register' component={Register} />
    </AuthStack.Navigator>
  )
}

export default AuthStack
