import { createStackNavigator } from '@react-navigation/stack'
// Import your screen components
import Home from '../../Screens/Home'
import Details from '../../Screens/Details'
import Welcome from '../../Screens/Welcome'
import Login from '../../Screens/Login'
import LoginForm from '../../Screens/LoginForm'
import Register from '../../Screens/Register'
import { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'

const AuthStack = createStackNavigator()
const AppStack = createStackNavigator()

const AuthStackScreen = () => (
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

const AppStackScreen = () => (
  <AppStack.Navigator>
    <AppStack.Screen name='Home' component={Home} />
    <AppStack.Screen name='Details' component={Details} />
  </AppStack.Navigator>
)

export default function StackNav() {
  const [isAuthenticated, setIsAuthenticated] = useState('fgsdfgd')
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  )
}
