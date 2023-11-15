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
import { Text, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { FontAwesome5 } from '@expo/vector-icons'
import { useTheme } from '../../Styles/theme'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import Profile from '../../Screens/Profile'
import Users from '../../Screens/Admin/Users'

const AuthStack = createStackNavigator()
const AppStack = createStackNavigator()

const hamburgerMenu = () => {
  const navigation = useNavigation()
  const { theme } = useTheme()
  return (
    <View
      style={{
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name='menu' size={38} color={theme.colors.text} />
      </TouchableOpacity>
    </View>
  )
}

const profile = () => {
  const navigation = useNavigation()
  const { theme } = useTheme()
  return (
    <View
      style={{
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <FontAwesome5 name='user-circle' size={38} color={theme.colors.text} />
      </TouchableOpacity>
    </View>
  )
}

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

const Drawer = createDrawerNavigator()
const AppStackScreen = () => {
  const { theme } = useTheme()
  const [admin, setAdmin] = useState('object')

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
      }}
    >
      <Drawer.Screen name='Home' component={Home} />
      <Drawer.Screen name='Details' component={Details} />
      <Drawer.Screen name='Profile' component={Profile} />
      {admin ? <Drawer.Screen name='Users' component={Users} /> : null}
    </Drawer.Navigator>
  )
}

export default function StackNav() {
  const [isAuthenticated, setIsAuthenticated] = useState('object')
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  )
}
