import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { ColorTheme } from '../Styles/them'

function Details({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Home Screen</Text>
      <Button title='Go Back' onPress={() => navigation.goBack()} />
    </View>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Inter-SemiBold',
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

export default Details
