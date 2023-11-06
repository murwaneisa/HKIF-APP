import React, { useState } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Input from '../Utilities/UI/Input'
import { useTheme } from '../Styles/theme'

function Register() {
  const { theme } = useTheme()
  const styles = getStyles(theme)
  // State to manage if the password is visible
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          Welcome to{' '}
          <Text style={[styles.headerText, styles.hkifText]}>HKIF</Text>
        </Text>
      </View>
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
            <TouchableOpacity onPress={() => setPasswordVisible(prev => !prev)}>
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
    </View>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: '5%',
      backgroundColor: theme.colors.background,
    },
    inputContainer: {
      flex: 1,
      width: '100%',
      // Add any additional styling you need for the container of your inputs
    },
    headerText: {
      color: theme.colors.text,
      fontFamily: 'Inter-Bold',
      fontSize: Platform.select({
        ios: 30,
        android: 25,
        web: 35,
      }),
      margin: '10%',
    },
    hkifText: {
      color: theme.colors.primary,
    },
  })

export default Register
