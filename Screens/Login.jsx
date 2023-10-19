import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { useTheme } from '../Styles/theme'
import PrimaryButton from '../Utilities/UI/PrimaryButton'

function Login({ navigation }) {
  const { theme } = useTheme()

  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Login to your account </Text>
      <PrimaryButton
        paddingVertical={98}
        paddingHorizontal={12}
        onPress={() => navigation.navigate('Details')}
      >
        Login
      </PrimaryButton>
      <PrimaryButton
        paddingVertical={88}
        paddingHorizontal={12}
        onPress={() => navigation.navigate('Home')}
      >
        Register
      </PrimaryButton>
    </View>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textStyle: {
      fontFamily: 'Inter-SemiBold',
      color: theme.colors.text,
      fontSize: Platform.select({
        ios: 16,
        android: 18,
      }),
    },
  })
export default Login
