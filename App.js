import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import theme from './Styles/them'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>HKIF-APP</Text>
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
