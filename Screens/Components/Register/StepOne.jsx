import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Input from '../../../Utilities/UI/Input'
import PrimaryButton from '../../../Utilities/UI/PrimaryButton'
import GoogleButton from '../../../Utilities/UI/GoogleButton'

const StepOne = ({
  styles,
  goToNextStep,
  passwordVisible,
  setPasswordVisible,
  confirmPasswordVisible,
  setConfirmPasswordVisible,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  initialValues,
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
          value: values.firstName,
          onChangeText: handleChange('firstName'),
          onBlur: handleBlur('firstName'),
        }}
        error={values.firstName !== initialValues.firstName && errors.firstName}
      />
      <Input
        label='Last Name'
        textInputConfig={{
          autoCorrect: false,
          autoCapitalize: 'words',
          value: values.lastName,
          onChangeText: handleChange('lastName'),
          onBlur: handleBlur('lastName'),
        }}
        error={values.lastName !== initialValues.lastName && errors.lastName}
      />
      <Input
        label='Email Address'
        textInputConfig={{
          autoCorrect: false,
          value: values.email,
          onChangeText: handleChange('email'),
          onBlur: handleBlur('email'),
        }}
        error={values.email !== initialValues.email && errors.email}
      />
      <Input
        label='Password'
        textInputConfig={{
          secureTextEntry: !passwordVisible, // Hide the password by default
          autoCapitalize: 'none', // Do not auto-capitalize any characters
          autoCorrect: false, // Disable auto-correct
          returnKeyType: 'done', // Set the return key to "done"
          value: values.password,
          onChangeText: handleChange('password'),
          onBlur: handleBlur('password'),
        }}
        error={values.password !== initialValues.password && errors.password}
        // Add a right icon or button to toggle password visibility
        rightIcon={
          <TouchableOpacity onPress={() => setPasswordVisible(prev => !prev)}>
            <Text style={styles.hkifText}>
              {passwordVisible ? 'Hide' : 'Show'}
            </Text>
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
          value: values.confirmPassword,
          onChangeText: handleChange('confirmPassword'),
          onBlur: handleBlur('confirmPassword'),
        }}
        error={
          values.confirmPassword !== initialValues.confirmPassword &&
          errors.confirmPassword
        }
        // Add a right icon or button to toggle password visibility
        rightIcon={
          <TouchableOpacity
            onPress={() => setConfirmPasswordVisible(prev => !prev)}
          >
            <Text style={styles.hkifText}>
              {confirmPasswordVisible ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonWrapper}>
          <PrimaryButton
            style={{ marginBottom: 10, width: '100%' }}
            paddingVertical={40}
            paddingHorizontal={12}
            disabled={
              values.firstName === initialValues.firstName ||
              values.lastName === initialValues.lastName ||
              values.email === initialValues.email ||
              values.password === initialValues.password ||
              values.confirmPassword === initialValues.confirmPassword ||
              errors.firstName ||
              errors.lastName ||
              errors.email ||
              errors.password ||
              errors.confirmPassword
            }
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
