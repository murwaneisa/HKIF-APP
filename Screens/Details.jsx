import React from 'react'
import { View, Text, Button, StyleSheet, Platform } from 'react-native'
import { ColorTheme, useTheme } from '../Styles/theme'

function Details({ navigation }) {
 

   const styles = getStyles()

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Home Screen</Text>
      <Button title='Go Back' onPress={() => navigation.goBack()} />
    </View>
  )
}

const getStyles =()=>
  StyleSheet.create({
    textStyle: {
      fontFamily: 'Inter-SemiBold',
      color: '#6B6B6B',
      fontSize: Platform.select({
        ios: 16,
        android: 18,
      }),
    },
    container: {
      flex: 1,
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
export default Details
