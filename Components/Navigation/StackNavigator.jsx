import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const StackNavigator = ({ headerLeft, children }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: headerLeft,
        headerStyle: {
          backgroundColor: '#F5F5F5', // accent color
        },
        headerTitleStyle: {
          color: '#6B6B6B', // text-primary color
          fontFamily: 'Inter-Medium',
        },
        headerTitleAlign: 'center',
        drawerActiveBackgroundColor: '#A9CAA1', // primary-200
        drawerActiveTintColor: '#466C3D', // primary-900
        drawerInactiveTintColor: '#6B6B6B', // text-primary
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Inter-Medium',
          fontSize: 15,
        },
        drawerStyle: {
          backgroundColor: '#FFFFFF', // background-primary
        },
      }}
    >
      {children}
    </Stack.Navigator>
  )
}

export default StackNavigator
