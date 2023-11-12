import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Input from '../../../Utilities/UI/Input'
import PrimaryButton from '../../../Utilities/UI/PrimaryButton'
import GoogleButton from '../../../Utilities/UI/GoogleButton'

const StepOne = ({
  styles,
  goToNextStep,
  passwordVisible,
  confirmPasswordVisible,
}) => {
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
}

export default StepOne
