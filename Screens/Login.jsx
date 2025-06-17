import React, { useState } from 'react'
import {
  View,
  Text,
  Platform,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native'

import PrimaryButton from '../Utilities/UI/PrimaryButton'
import GoogleButton from '../Utilities/UI/GoogleButton'
import { validateEmail, dismissKeyboard } from '../Utilities/UI/Form'
import { useDispatch } from 'react-redux'
import { loginAndSetUser } from '../Utilities/Redux/Actions/userActions'
import { loginAndSetAdmin } from '../Utilities/Redux/Actions/adminActions'
import { Ionicons } from '@expo/vector-icons'; // Assuming @expo/vector-icons is installed

function Login({ navigation }) {
  const [showAdminButton, setShowAdminButton] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isAdminLoading, setIsAdminLoading] = useState(false)

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

  const handleUserLogin = async () => {
    if (!isFormValid()) return;
    
    setIsLoading(true);
    try {
      await dispatch(loginAndSetUser(email, password));
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = async () => {
    if (!isFormValid()) return;
    
    setIsAdminLoading(true);
    try {
      await dispatch(loginAndSetAdmin(email, password));
    } catch (error) {
      console.error('Admin login failed:', error);
    } finally {
      setIsAdminLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: 60, android: 0 })}
    >
      <TouchableWithoutFeedback
        onPress={Platform.OS !== 'web' ? dismissKeyboard : undefined}
      >
        <View className="flex-1 items-center justify-center bg-white px-4">
          {/* Header */}
          <View className="absolute top-0 left-0 right-0 flex-row items-center justify-center p-4">
            <TouchableOpacity onPress={() => navigation.goBack()} className="absolute left-4">
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-xl font-bold">Login to continue</Text>
          </View>

          {/* Logo */}
          <View className="h-2/5 w-full p-4">
            <Image
              className="w-full h-full"
              source={require('../Assets/images/login2.png')}
              resizeMode='contain'
            />
          </View>

          {/* Welcome Back / Sign in text */}
          <Text className="text-3xl font-bold mb-2">Welcome Back</Text>
          <Text className="text-base text-gray-500 mb-8">Sign in to Lakers Basketball</Text>

          {/* Form Container */}
          <View className="w-full items-center justify-center px-4">
            {/* Email Input */}
            <View className="w-11/12 mb-5">
                <View className={`flex-row items-center border rounded-full px-4 py-3 ${!isEmailValid && touched.email ? 'border-red-500' : 'border-gray-300'}`}>
                    <Ionicons name="mail-outline" size={20} color="#6B6B6B" className="mr-3" />
                    <TextInput
                        className="flex-1 text-base text-gray-600"
                        value={email}
                        onChangeText={handleEmailChange}
                        placeholder='Enter your email'
                        placeholderTextColor={'#6B6B6B'}
                        keyboardType={Platform.OS !== 'web' ? 'email-address' : undefined}
                    />
                </View>
                {!isEmailValid && touched.email && (
                    <Text className="text-red-500 text-xs mt-1 ml-4">Invalid email format</Text>
                )}
            </View>

            {/* Password Input */}
            <View className="w-11/12 mb-8 flex-row items-center border border-gray-300 rounded-full px-4 py-3">
              <Ionicons name="lock-closed-outline" size={20} color="#6B6B6B" className="mr-3" />
              <TextInput
                className="flex-1 text-base text-gray-600"
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry
                placeholder='Enter your password'
                placeholderTextColor={'#6B6B6B'}
              />
              <Ionicons name="eye-outline" size={20} color="#6B6B6B" />
            </View>
          </View>

          {/* Buttons Container */}
          <View className="w-full items-center px-4">
            <PrimaryButton
              size="large"
              variant="primary"
              gradient={true}
              onLongPress={() => setShowAdminButton(true)}
              onPress={handleUserLogin}
              isLoading={isLoading}
              loadingText="Logging in"
              disabled={!isFormValid()}
              width="full"
            >
              Log In
            </PrimaryButton>

            {showAdminButton && (
              <PrimaryButton
                size="large"
                variant="secondary"
                gradient={true}
                onPress={handleAdminLogin}
                isLoading={isAdminLoading}
                loadingText="Logging in as admin..."
                disabled={!isFormValid()}
                width="full"
              >
                Log In as Admin
              </PrimaryButton>
            )}
            
            {/* Forgot Password */}
            <TouchableOpacity className="mt-4 mb-8">
              <Text className="text-blue-500 text-base font-semibold">Forgot Password?</Text>
            </TouchableOpacity>

            {/* OR separator */}
            <View className="flex-row items-center w-full mb-8">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="text-gray-500 mx-4">or</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Sign Up Button */}
            <PrimaryButton
                size="large"
                variant="outline"
                onPress={() => navigation.navigate('Register')}
                width="full"
            >
                <View className="flex-row items-center justify-center">
                    <Ionicons name="person-add-outline" size={20} color="black" className="mr-2" />
                    <Text className="text-black font-semibold">Sign Up</Text>
                </View>
            </PrimaryButton>

            {/* Continue as Guest */}
            <TouchableOpacity className="mt-8 flex-row items-center">
                <Ionicons name="person-outline" size={20} color="black" className="mr-2" />
                <Text className="text-black text-base">Continue as Guest</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default Login
