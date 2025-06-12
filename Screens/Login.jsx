import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native'

import PrimaryButton from '../Utilities/UI/PrimaryButton'
import GoogleButton from '../Utilities/UI/GoogleButton'
import { validateEmail, dismissKeyboard } from '../Utilities/UI/Form'
import { useDispatch } from 'react-redux'
import { loginAndSetUser } from '../Utilities/Redux/Actions/userActions'
import { loginAndSetAdmin } from '../Utilities/Redux/Actions/adminActions'

function Login({ navigation }) {
  const [showAdminButton, setShowAdminButton] = useState(false)
  const screenWidth = Dimensions.get('window').width
 

  const styles = getStyles(screenWidth)

  const [email, setEmail] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(true)
  const handleEmailChange = text => {
    setEmail(text)
    setIsEmailValid(validateEmail(text))
    setTouched({ ...touched, email: true })
  }
  const [password, setPassword] = useState('')
  const handlePasswordChange = text => {
    setPassword(text)
    setTouched({ ...touched, password: true })
  }
  const dispatch = useDispatch()

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  })

  const isFormValid = () => {
    return (
      isEmailValid &&
      email !== '' &&
      password !== '' &&
      touched.email &&
      touched.password
    )
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: 60, android: 0 })}
    >
      <TouchableWithoutFeedback
        onPress={Platform.OS !== 'web' ? dismissKeyboard : undefined}
      >
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
                style={[styles.inputText, !isEmailValid && styles.invalidInput]}
                value={email}
                onChangeText={handleEmailChange}
                placeholder='Email'
                placeholderTextColor={'#6B6B6B'}
                keyboardType={
                  Platform.OS !== 'web' ? 'email-address' : undefined
                }
              />
              {!isEmailValid && (
                <Text style={styles.errorText}>Invalid email format</Text>
              )}
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry
                placeholder='Password'
                placeholderTextColor={'#6B6B6B'}
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
                onPress={() => {
                  if (isFormValid()) {
                    try {
                      dispatch(loginAndSetUser(email, password))
                    } catch (error) {
                      console.error('Login failed:', error)
                    }
                  }
                }}
                disabled={!isFormValid()}
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
                  onPress={async () => {
                    if (isFormValid()) {
                      try {
                        dispatch(loginAndSetAdmin(email, password))
                      } catch (error) {
                        console.error('Login failed:', error)
                      }
                    }
                  }}
                  disabled={!isFormValid()}
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
            <Text style={styles.textStyle}>Register</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const getStyles = (screenWidth) =>
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
      backgroundColor: 'white',
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
      color: '#6B6B6B',
      borderColor: 'gray',
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
      color: 'green',
      textAlign: 'center',
      fontSize: Platform.select({
        ios: 15,
        android: 15,
      }),
    },
    invalidInput: {
      borderColor: 'red', // or any color to indicate error
    },
    errorText: {
      color: 'red', // or any color to indicate error
      fontSize: 12,
      marginTop: 5,
    },
  })
export default Login
