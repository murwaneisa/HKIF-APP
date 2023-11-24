import { createStackNavigator } from '@react-navigation/stack'
// Import your screen components
import Home from '../../Screens/Home'
import Details from '../../Screens/Details'
import Welcome from '../../Screens/Welcome'
import Login from '../../Screens/Login'
import LoginForm from '../../Screens/LoginForm'
import Activity from '../../Screens/Activity'

// Create a Stack Navigator
const Stack = createStackNavigator()

export default function StackNav() {
  return (
    <Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen
        name='Welcome'
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Login'
        component={Login}
        options={{ headerLeft: () => null, headerShown: false }}
      />
      <Stack.Screen name='Login Form' component={LoginForm} />
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Details' component={Details} />
      <Stack.Screen name='Activity' component={Activity}  />
    </Stack.Navigator>
  )
}
