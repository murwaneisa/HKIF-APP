import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TextInput,
} from 'react-native'
import { useTheme } from '../Styles/theme'
import PrimaryButton from '../Utilities/UI/PrimaryButton'

function LoginForm({ navigation }) {
  const { theme } = useTheme()

  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={{ width: '100%', height: '100%' }}
          source={require('../Assets/images/login2.png')}
          resizeMode='contain'
        />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder='Email'
            placeholderTextColor={theme.colors.accent}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            secureTextEntry
            placeholder='Password'
            placeholderTextColor={theme.colors.accent}
          />
        </View>
      </View>
      <View styles={styles.buttonsContainer}>
        <PrimaryButton
          paddingVertical={98}
          paddingHorizontal={12}
          onPress={() => navigation.navigate('Details')}
        >
          Login
        </PrimaryButton>
        <Text style={styles.textStyle}>Register </Text>
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
      height: '50%', // This sets the height to 60% of the parent container
      width: '100%',
      padding: '5%',
    },
    formContainer: {
      width: '100%',
    },
    inputView: {
      Width: '80%',
    },
    inputText: {
      height: 50,
      width: '100%',
      borderColor: theme.colors.accent,
      borderWidth: 1,
      borderRadius: 25,
      marginBottom: 20,
      justifyContent: 'center',
      padding: 20,
    },
    buttonsContainer: {
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
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
export default LoginForm
