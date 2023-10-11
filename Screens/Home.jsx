import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { ColorTheme } from '../Styles/them'

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Home Screen</Text>
      <Button
        title='Go to Details'
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Inter-Light',
    fontSize: Platform.select({
      ios: 20,
      android: 16,
    }),
  },
  container: {
    flex: 1,
    backgroundColor: ColorTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Home
