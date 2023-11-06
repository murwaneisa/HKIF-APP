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
          <Text style={styles.headerText}>
            <Text> Welcome to </Text>
            <Text style={styles.hkifText}>HKIF</Text>
          </Text>

          <View style={styles.inputContainer}>
            <Input
              label='First Name'
              textInputConfig={{
                autoCorrect: false,
                autoCapitalize: 'words',
                keyboardType: "'default",
              }}
            />
            <Input
              label='Last Name'
              textInputConfig={{
                autoCorrect: false,
                autoCapitalize: 'words',
                keyboardType: "'default",
              }}
            />
            <Input
              label='Email Address'
              textInputConfig={{
                autoCorrect: false,
                keyboardType: "'default",
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
      alignItems: Platform.select({
        ios: 'center',
        android: 'center',
        web: 'center',
      }),
      paddingHorizontal: '5%',
      backgroundColor: theme.colors.background,
    },
    inputContainer: {
      flex: 1,
      width: '100%',
      // Add any additional styling you need for the container of your inputs
    },
    headerText: {
      flexDirection: 'row',
      color: theme.colors.text,
      fontFamily: 'Inter-Bold',
      fontSize: Platform.select({
        ios: 30,
        android: 25,
        web: 35,
      }),
      margin: Platform.select({
        ios: '10%',
        android: '10%',
        web: '3%',
      }),
    },
    hkifText: {
      color: theme.colors.primary,
    },
    buttonsContainer: {
      /*   padding: '1%',
        borderWidth: 2, // Set the border width
        borderColor: 'blue', // Set the border color */
      width: screenWidth >= 800 ? '30%' : screenWidth >= 500 ? '50%' : '60%',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical:
        screenWidth >= 800 ? '10%' : screenWidth <= 500 ? '20%' : '15%',
    },
    buttonWrapper: {
      marginBottom: 10,
      width: '100%',
    },
    textStyle: {
      fontFamily: 'Inter-SemiBold',
      padding: '4%',
      color: theme.colors.text,
      textAlign: 'center',
      fontSize: Platform.select({
        ios: 15,
        android: 15,
      }),
    },
  })

export default Register
