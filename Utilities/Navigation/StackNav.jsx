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
import { Text, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { FontAwesome5 } from '@expo/vector-icons'
import { useTheme } from '../../Styles/theme'

const AuthStack = createStackNavigator()
const AppStack = createStackNavigator()

const hamburgerMenu = ({ navigation }) => {
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
      <Ionicons name='menu' size={38} color={theme.colors.text} />
    </View>
  )
}

const profile = ({ navigation }) => {
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
      <FontAwesome5 name='user-circle' size={38} color={theme.colors.text} />
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

const AppStackScreen = () => {
  const { theme } = useTheme() // Use the theme hook here

  return (
    <AppStack.Navigator
      screenOptions={{
        headerLeft: hamburgerMenu,
        headerRight: profile,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: theme.colors.accent, // Use the theme for styling
        },
        headerTitleStyle: {
          color: theme.colors.text,
        },
      }}
    >
      <AppStack.Screen name='Home' component={Home} />
      <AppStack.Screen name='Details' component={Details} />
    </AppStack.Navigator>
  )
}

export default function StackNav() {
  const [isAuthenticated, setIsAuthenticated] = useState('user')
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  )
}
