import React from 'react'
import { View, Text, Button, StyleSheet, Platform } from 'react-native'
import { ColorTheme, useTheme } from '../Styles/theme'
import GoogleButton from '../Utilities/UI/GoogleButton'
import { useGoogleAuth } from '../Utilities/GoogleOAuth/auth'

function Details({ navigation }) {
  const { theme } = useTheme()

  const styles = getStyles(theme)

  const { promptGoogleSignIn, authData } = useGoogleAuth()

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Home Screen</Text>
      <Button title='Go Back' onPress={() => navigation.goBack()} />
      <GoogleButton
        paddingVertical={98}
        paddingHorizontal={12}
        onPress={promptGoogleSignIn}
      >
        Login with Google
      </GoogleButton>
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
