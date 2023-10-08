import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import StackNav from './Utilities/Navigation/StackNav' // Import your navigator

export default function App() {
  return (
    <>
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
      <StatusBar style='auto' />
    </>
  )
}
