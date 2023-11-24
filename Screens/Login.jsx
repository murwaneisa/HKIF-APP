import React from 'react'
import { View, Text, StyleSheet, Platform, Image } from 'react-native'
import { useTheme } from '../Styles/theme'
import PrimaryButton from '../Utilities/UI/PrimaryButton'

function Login({ navigation }) {
  const { theme } = useTheme()

  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={{ width: '100%', height: '100%' }}
          source={require('../Assets/images/sports_icon.png')}
          resizeMode='contain'
        />
      </View>
      <View styles={styles.buttonsContainer}>
        <View style={styles.buttonWrapper}>
          <PrimaryButton
            paddingVertical={98}
            paddingHorizontal={12}
            onPress={() => navigation.navigate('Login Form')}
          >
            Login
          </PrimaryButton>
        </View>
        <PrimaryButton
          paddingVertical={88}
          paddingHorizontal={12}
          onPress={() => navigation.navigate('Activity')}
        >
          Register
        </PrimaryButton>
        <Text style={styles.textStyle}>Login as Guest </Text>
      </View>
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
    imageContainer: {
      height: '60%', // This sets the height to 60% of the parent container
      width: '100%',
      padding: '5%',
    },
    buttonsContainer: {
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonWrapper: {
      marginBottom: 10,
    },
    textStyle: {
      fontFamily: 'Inter-SemiBold',
      paddingTop: '6%',
      color: theme.colors.primary,
      textAlign: 'center',
      fontSize: Platform.select({
        ios: 15,
        android: 15,
      }),
    },
  })
export default Login
