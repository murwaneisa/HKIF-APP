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
/* const AppStackScreen = () => {
  const { theme } = useTheme()
  const styles = getStyles(theme)
  const [admin, setAdmin] = useState('object')
  const HomeIcon = () => (
    <FontAwesome5 name='home' size={24} color={theme.colors.text} />
  )
  const DetailsIcon = () => (
    <FontAwesome5 name='info' size={24} color={theme.colors.text} />
  )
  const ProfileIcon = () => (
    <FontAwesome5 name='user' size={24} color={theme.colors.text} />
  )
  const UsersIcon = () => (
    <FontAwesome5 name='users' size={24} color={theme.colors.text} />
  )

  return (
    <Drawer.Navigator
      screenOptions={{
        headerRight: () => profile(),
        headerLeft: () => hamburgerMenu(),
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: theme.colors.accent, // Use the theme for styling
        },
        headerTitleStyle: {
          color: theme.colors.text,
        },
        drawerStyle: {
          backgroundColor: theme.colors.accent,
        },
        drawerLabelStyle: {
          color: theme.colors.text,
        },
      }}
    >
      <Drawer.Screen
        name='Home'
        component={Home}
        options={{
          drawerIcon: HomeIcon, // Set the custom icon for the Home drawer item
        }}
      />
      <Drawer.Screen
        name='Details'
        component={Details}
        options={{
          drawerIcon: DetailsIcon, // Set the custom icon for the Details drawer item
        }}
      />
      <Drawer.Screen
        name='Profile'
        component={Profile}
        options={{
          drawerIcon: ProfileIcon, // Set the custom icon for the Profile drawer item
        }}
      />
      {admin ? (
        <Drawer.Screen
          name='Users'
          component={Users}
          options={{
            drawerIcon: UsersIcon, // Set the custom icon for the Users drawer item
          }}
        />
      ) : null}
    </Drawer.Navigator>
  )
} */

export default function StackNav() {
  const [isAuthenticated, setIsAuthenticated] = useState('sdfsf')
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}
