import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Input from '../../../Utilities/UI/Input'
import PrimaryButton from '../../../Utilities/UI/PrimaryButton'
import GoogleButton from '../../../Utilities/UI/GoogleButton'
import { useState, useEffect } from 'react'

const StepOne = ({
  styles,
  goToNextStep,
  passwordVisible,
  setPasswordVisible,
  confirmPasswordVisible,
  setConfirmPasswordVisible,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  })
  const handleBlur = field => {
    setTouched(prevTouched => {
      const updatedTouched = { ...prevTouched, [field]: true }
      validateStepOne(updatedTouched) // Call validateStepOne with the updated state
      return updatedTouched
    })
  }
  const validateStepOne = currentTouched => {
    let validationErrors = {}

    if (!firstName.trim() && currentTouched.firstName) {
      validationErrors.firstName = 'First name is required'
    }

    if (!lastName.trim() && currentTouched['lastName']) {
      validationErrors.lastName = 'Last name is required'
    }

    if (!email.trim() && currentTouched['email']) {
      validationErrors.email = 'Email address is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'Email address is invalid'
    }

    if (!password && currentTouched['password']) {
      validationErrors.password = 'Password is required'
    } else if (password.length < 6 && currentTouched['password']) {
      validationErrors.password = 'Password must be at least 6 characters'
    }

    if (!confirmPassword && currentTouched['confirmPassword']) {
      validationErrors.confirmPassword = 'Confirm password is required'
    } else if (
      password !== confirmPassword &&
      currentTouched['confirmPassword']
    ) {
      validationErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(validationErrors)
    return Object.keys(validationErrors).length === 0
  }
  const isFormValid = () => {
    const allFieldsTouched = Object.values(touched).every(t => t)
    const allFieldsFilled =
      firstName.trim() &&
      lastName.trim() &&
      email.trim() &&
      password &&
      confirmPassword
    const noErrors = Object.keys(errors).length === 0

    return allFieldsTouched && allFieldsFilled && noErrors
  }
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
          value: firstName,
          onChangeText: setFirstName,
          onBlur: () => {
            handleBlur('firstName')
          },
        }}
        error={touched.firstName && errors.firstName}
      />
      <Input
        label='Last Name'
        textInputConfig={{
          autoCorrect: false,
          autoCapitalize: 'words',
          value: lastName,
          onChangeText: setLastName,
          onBlur: () => {
            handleBlur('lastName')
          },
        }}
        error={touched.lastName && errors.lastName}
      />
      <Input
        label='Email Address'
        textInputConfig={{
          autoCorrect: false,
          value: email,
          onChangeText: setEmail,
          onBlur: () => {
            handleBlur('email')
          },
        }}
        error={touched.email && errors.email}
      />
      <Input
        label='Password'
        textInputConfig={{
          secureTextEntry: !passwordVisible, // Hide the password by default
          autoCapitalize: 'none', // Do not auto-capitalize any characters
          autoCorrect: false, // Disable auto-correct
          returnKeyType: 'done', // Set the return key to "done"
          value: password,
          onChangeText: setPassword,
          onBlur: () => {
            handleBlur('password')
          },
        }}
        error={touched.password && errors.password}
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
          value: confirmPassword,
          onChangeText: setConfirmPassword,
          onBlur: () => {
            handleBlur('confirmPassword')
          },
        }}
        error={touched.confirmPassword && errors.confirmPassword}
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
            disabled={!isFormValid()}
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
