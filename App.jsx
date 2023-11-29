import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import StackNav from './Utilities/Navigation/StackNav' // Import your navigator
import { FontLoader, ThemeProvider } from './Styles/theme'
import 'react-native-gesture-handler'

export default function App() {
  return (
    <>
      <ThemeProvider>
        <FontLoader>
          <NavigationContainer>
            <StackNav />
          </NavigationContainer>
        </FontLoader>
      </ThemeProvider>
    </>
  )
}
