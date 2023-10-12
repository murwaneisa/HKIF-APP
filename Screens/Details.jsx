import React from 'react'
import { View, Text, Button, StyleSheet, Platform } from 'react-native'
import { ColorTheme, useTheme } from '../Styles/theme'

function Details({ navigation }) {
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    textStyle: {
      fontFamily: 'Inter-SemiBold',
      color: theme.colors.text,
      fontSize: Platform.select({
        ios: 16,
        android: 18,
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
      <Button title='Go Back' onPress={() => navigation.goBack()} />
    </View>
  )
}

export default Details
