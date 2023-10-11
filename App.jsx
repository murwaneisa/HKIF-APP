import { StyleSheet, Text, View } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import StackNav from './Utilities/Navigation/StackNav' // Import your navigator
import { FontLoader } from './Styles/them'

export default function App() {
  return (
    <>
      <FontLoader>
        <NavigationContainer>
          <StackNav />
        </NavigationContainer>
      </FontLoader>
    </>
  )
}
