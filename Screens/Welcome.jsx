import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native'
import { useTheme } from '../Styles/theme'
import PrimaryButton from '../Utilities/UI/PrimaryButton'

function Welcome({ navigation }) {
  const { theme } = useTheme()
  const styles = getStyles(theme)
  const handleGuestLogin = () => {
    navigation.navigate('Home')
  }
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
            onPress={() => navigation.navigate('Login')}
          >
            Login
          </PrimaryButton>
        </View>
        <PrimaryButton
          paddingVertical={88}
          paddingHorizontal={12}
          onPress={() => navigation.navigate('Register')}
        >
          Register
        </PrimaryButton>
        <TouchableOpacity onPress={handleGuestLogin}>
          <Text style={styles.textStyle}>Login as Guest</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundPrimary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageContainer: {
      height: '60%',
      width: '100%',
      padding: '5%',
    },
    buttonsContainer: {
      backgroundColor: theme.colors.backgroundPrimary,
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
export default Welcome
