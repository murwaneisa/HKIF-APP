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
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { FontAwesome5 } from '@expo/vector-icons'
import { useTheme } from '../../Styles/theme'

import { useNavigation } from '@react-navigation/native'
import Profile from '../../Screens/Profile'
import Users from '../../Screens/Admin/Users'
import { createDrawerNavigator } from '@react-navigation/drawer'
import AuthStack from './AuthStack'
import AppStack from './AppStack'

const Drawer = createDrawerNavigator()

export default function StackNav() {
  const [isAuthenticated, setIsAuthenticated] = useState('SDFSD')
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}
