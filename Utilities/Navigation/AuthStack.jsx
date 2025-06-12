import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Splash from '@screens/Splash'
import Login from '@screens/Login'
import Register from '@screens/Register'
import HeaderLeft from '@components/Navigation/HeaderLeft'
import OrganizationSelection from '@screens/OrganizationSelection'

const Stack = createStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <HeaderLeft />,
      }}
    >
      <Stack.Screen
        name='Splash'
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Organizations'
        component={OrganizationSelection}
        options={{ headerLeft: () => null, headerShown: false }}
      />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
    </Stack.Navigator>
  )
}

export default AuthStack
