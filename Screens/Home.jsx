import React from 'react'
import { View, Text, Button, StyleSheet, Platform } from 'react-native'
import { useTheme } from '../Styles/theme'

function Home({ navigation }) {
  const { theme, toggleTheme } = useTheme()

  const styles = StyleSheet.create({
    textStyle: {
      fontFamily: 'Inter-Light',
      color: theme.colors.text,
      fontSize: Platform.select({
        ios: 20,
        android: 16,
      }),
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Home Screen</Text>
      <Button
        title='Go to Details'
        onPress={() => navigation.navigate('Details')}
      />
      <Button title='Toggle Theme' onPress={toggleTheme} />
    </View>
  )
}

export default Home
