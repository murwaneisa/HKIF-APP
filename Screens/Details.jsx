import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, Platform } from 'react-native'
import { ColorTheme, useTheme } from '../Styles/theme'
import GoogleButton from '../Utilities/UI/GoogleButton'

function Details({ navigation }) {
  const { theme } = useTheme()

  const styles = getStyles(theme)

  const [userInfo, setUserInfo] = useState({})

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Home Screen</Text>
      <Button title='Go Back' onPress={() => navigation.goBack()} />
      <GoogleButton setUserInfo={setUserInfo}></GoogleButton>
      <Text>{JSON.stringify(userInfo, null, 2)}</Text>
    </View>
  )
}

const getStyles = theme =>
  StyleSheet.create({
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
export default Details
