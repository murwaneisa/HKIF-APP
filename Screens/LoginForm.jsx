import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { useTheme } from '../Styles/theme'
import PrimaryButton from '../Utilities/UI/PrimaryButton'
import GoogleButton from '../Utilities/UI/GoogleButton'

function LoginForm({ navigation }) {
  const [showAdminButton, setShowAdminButton] = useState(false)
  const screenWidth = Dimensions.get('window').width
  const { theme } = useTheme()

  const styles = getStyles(theme, screenWidth)
  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: 60, android: 0 })}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
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
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonWrapper}>
              <PrimaryButton
                style={{ marginBottom: 10, width: '100%' }}
                paddingVertical={40}
                paddingHorizontal={12}
                onLongPress={() => setShowAdminButton(true)}
                onPress={() => navigation.navigate('Details')}
              >
                Login
              </PrimaryButton>
            </View>
            {showAdminButton && (
              <View style={styles.buttonWrapper}>
                <PrimaryButton
                  style={{ marginBottom: 10, width: '100%' }}
                  paddingVertical={40}
                  paddingHorizontal={12}
                  onPress={() => navigation.navigate('Home')}
                  onLongPress={() => setShowAdminButton(true)} // You might want to navigate to a different route for admin
                >
                  Login as Admin
                </PrimaryButton>
              </View>
            )}
            <View style={styles.buttonWrapper}>
              <GoogleButton paddingVertical={98} paddingHorizontal={12}>
                Login with Google
              </GoogleButton>
            </View>
            <Text style={styles.textStyle}>Register </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const getStyles = (theme, screenWidth) =>
  StyleSheet.create({
    keyboardAvoiding: {
      padding: '1%',
      borderWidth: 2, // Set the border width
      borderColor: 'red', // Set the border color
    },
    container: {
      flex: 1,
      alignItems: 'center', // This will horizontally center the child elements
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
    imageContainer: {
      height: '48%', // This sets the height to 60% of the parent container
      width: '100%',
      padding: '5%',
    },
    formContainer: {
      width: '100%',
      alignItems: 'center', // This will horizontally center the child elements
      justifyContent: 'center',
    },
    inputView: {
      width: screenWidth > 800 ? '40%' : '80%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    inputText: {
      width: '100%',
      borderColor: theme.colors.accent,
      borderWidth: 1,
      borderRadius: 25,
      justifyContent: 'center',
      padding: screenWidth >= 800 ? '2%' : screenWidth >= 500 ? '3%' : '4%',
    },
    buttonsContainer: {
      /*   padding: '1%',
      borderWidth: 2, // Set the border width
      borderColor: 'blue', // Set the border color */
      width: screenWidth >= 800 ? '30%' : screenWidth >= 500 ? '50%' : '60%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20%',
    },
    buttonWrapper: {
      marginBottom: 10,
      width: '100%',
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
