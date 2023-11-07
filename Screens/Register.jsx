import React, { useState } from 'react'
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Input from '../Utilities/UI/Input'
import { useTheme } from '../Styles/theme'
import PrimaryButton from '../Utilities/UI/PrimaryButton'
import GoogleButton from '../Utilities/UI/GoogleButton'

function Register() {
  const screenWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, screenWidth)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      // Handle the final submission
      console.log('Final Form Data:', formData)
      // navigate to another screen or perform the submission action
    }
  }
  const totalSteps = 2

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Text style={styles.headerText}>
              <Text> Welcome to </Text>
              <Text style={styles.hkifText}>HKIF</Text>
            </Text>
            <Input
              label='First Name'
              textInputConfig={{
                autoCorrect: false,
                autoCapitalize: 'words',
              }}
            />
            <Input
              label='Last Name'
              textInputConfig={{
                autoCorrect: false,
                autoCapitalize: 'words',
              }}
            />
            <Input
              label='Email Address'
              textInputConfig={{
                autoCorrect: false,
              }}
            />
            <Input
              label='Password'
              textInputConfig={{
                secureTextEntry: !passwordVisible, // Hide the password by default
                autoCapitalize: 'none', // Do not auto-capitalize any characters
                autoCorrect: false, // Disable auto-correct
                returnKeyType: 'done', // Set the return key to "done"
              }}
              // Add a right icon or button to toggle password visibility
              rightIcon={
                <TouchableOpacity
                  onPress={() => setPasswordVisible(prev => !prev)}
                >
                  <Text>{passwordVisible ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
              }
            />
            <Input
              label='Confirm Password'
              textInputConfig={{
                secureTextEntry: !confirmPasswordVisible, // Hide the password by default
                autoCapitalize: 'none', // Do not auto-capitalize any characters
                autoCorrect: false, // Disable auto-correct
                returnKeyType: 'done', // Set the return key to "done"
              }}
              // Add a right icon or button to toggle password visibility
              rightIcon={
                <TouchableOpacity
                  onPress={() => setConfirmPasswordVisible(prev => !prev)}
                >
                  <Text>{confirmPasswordVisible ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
              }
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonWrapper}>
                <PrimaryButton
                  style={{ marginBottom: 10, width: '100%' }}
                  paddingVertical={40}
                  paddingHorizontal={12}
                  onLongPress={() => setShowAdminButton(true)}
                  onPress={goToNextStep}
                >
                  Continue
                </PrimaryButton>
              </View>
              <Text style={styles.textStyle}>OR </Text>
              <View style={styles.buttonWrapper}>
                <GoogleButton paddingVertical={98} paddingHorizontal={12}>
                  Sign Up with Google
                </GoogleButton>
              </View>
            </View>
          </>
        )
      case 2:
        return (
          <>
            <Text style={[styles.headerText, styles.headerSubText]}>
              <Text> Please fill out the requested information </Text>
            </Text>
            <Input
              label='First Name'
              textInputConfig={{
                autoCorrect: false,
                autoCapitalize: 'words',
              }}
            />
            <Input
              label='Last Name'
              textInputConfig={{
                autoCorrect: false,
                autoCapitalize: 'words',
              }}
            />
            <Input
              label='Email Address'
              textInputConfig={{
                autoCorrect: false,
              }}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonWrapper}>
                <PrimaryButton
                  style={{ marginBottom: 10, width: '100%' }}
                  paddingVertical={40}
                  paddingHorizontal={12}
                  onLongPress={() => setShowAdminButton(true)}
                  onPress={goToNextStep}
                >
                  Continue
                </PrimaryButton>
              </View>
              <View style={styles.buttonWrapper}>
                <PrimaryButton
                  style={{ marginBottom: 10, width: '100%' }}
                  paddingVertical={40}
                  paddingHorizontal={12}
                  onLongPress={() => setShowAdminButton(true)}
                  onPress={goToNextStep}
                >
                  Previous
                </PrimaryButton>
              </View>
            </View>
          </>
        )
      default:
        return null
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled' // This ensures taps are not dismissed when the keyboard is open
      >
        <View style={styles.container}>
          <View style={styles.inputContainer}>{renderStep()}</View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const getStyles = (theme, screenWidth) =>
  StyleSheet.create({
    scrollViewContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      alignItems: Platform.select({
        ios: 'center',
        android: 'center',
        web: 'center',
      }),
      paddingHorizontal: '6%',
      backgroundColor: theme.colors.background,
    },
    inputContainer: {
      flex: 1,
      width: '100%',
      // Add any additional styling you need for the container of your inputs
    },
    headerText: {
      textAlign: 'center',
      color: theme.colors.text,
      fontFamily: 'Inter-Bold',
      fontSize: Platform.select({
        ios: 30,
        android: 25,
        web: 35,
      }),
      margin: Platform.select({
        ios: '5%',
        android: '5%',
        web: '3%',
      }),
    },
    hkifText: {
      color: theme.colors.primary,
    },
    headerSubText: {
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: Platform.select({
        ios: 12,
        android: 12,
        web: 30,
      }),
      margin: Platform.select({
        ios: '10%',
        android: '10%',
        web: '3%',
      }),
    },
    buttonsContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: Platform.select({
        ios: '6%',
        android: '6%',
        web: '3%',
      }),
    },
    buttonWrapper: {
      marginBottom: 10,
      width: Platform.select({
        ios: '70%',
        android: '70%',
        web: '40%',
      }),
      alignSelf: 'center', // This will center the button wrapper within its parent
    },
    textStyle: {
      fontFamily: 'Inter-SemiBold',
      paddingVertical: '1%',
      color: theme.colors.text,
      textAlign: 'center',
      fontSize: Platform.select({
        ios: 15,
        android: 15,
      }),
    },
  })

export default Register
