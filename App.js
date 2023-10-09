import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Platform, Text, View } from 'react-native'
import { ColorTheme, FontLoader } from './Styles/them'

function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>HKIF-APP</Text>
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: Platform.select({
      ios: 16,
      android: 18,
    }),
  },
  container: {
    flex: 1,
    backgroundColor: ColorTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default () => (
  <FontLoader>
    <App />
  </FontLoader>
)
