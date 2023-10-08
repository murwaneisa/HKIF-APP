import { createStackNavigator } from '@react-navigation/stack'
// Import your screen components
import Home from '../../Screens/Home'
import Details from '../../Screens/Details'

// Create a Stack Navigator
const Stack = createStackNavigator()

export default function StackNav() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Details' component={Details} />
    </Stack.Navigator>
  )
}
