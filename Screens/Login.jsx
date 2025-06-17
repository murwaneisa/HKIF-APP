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
import { validateEmail, dismissKeyboard } from '../Utilities/UI/Form'
import { useDispatch } from 'react-redux'
import { loginAndSetUser } from '../Utilities/Redux/Actions/userActions'
import { loginAndSetAdmin } from '../Utilities/Redux/Actions/adminActions'
import { Ionicons } from '@expo/vector-icons'


const organization = {
  id: '1',
  name: 'Manchester City FC',
  logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=80&h=80&fit=crop&crop=center',
  members: 1250,
  category: 'Football'
}
function Login({ navigation }) {
  const [showAdminButton, setShowAdminButton] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isAdminLoading, setIsAdminLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [email, setEmail] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState({ email: false, password: false })

  const dispatch = useDispatch()

  const handleEmailChange = text => {
    setEmail(text)
    setIsEmailValid(validateEmail(text))
    setTouched(prev => ({ ...prev, email: true }))
  }

  const handlePasswordChange = text => {
    setPassword(text)
    setTouched(prev => ({ ...prev, password: true }))
  }

  const isFormValid = () =>
    isEmailValid && email !== '' && password !== '' && touched.email && touched.password

  const handleUserLogin = async () => {
    if (!isFormValid()) return
    setIsLoading(true)
    try {
      await dispatch(loginAndSetUser(email, password))
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdminLogin = async () => {
    if (!isFormValid()) return
    setIsAdminLoading(true)
    try {
      await dispatch(loginAndSetAdmin(email, password))
    } catch (err) {
      console.error(err)
    } finally {
      setIsAdminLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View className="flex-1 px-6 items-center pt-2">
          <View className="h-28 w-28 mb-6 items-center justify-center rounded-full border-4 border-accent-deep overflow-hidden">
            <Image
              source={{ uri: organization.logo }}
              resizeMode="contain"
              className="h-full w-full rounded-full"
            />
          </View>

          <Text className="text-2xl md:text-3xl font-bold text-text-title mb-1">
            Welcome Back
          </Text>
          <Text className="text-base text-gray-500 mb-6">
            Sign in to {organization.name}
          </Text>

          <View className="w-full max-w-md mb-4 space-y-2">
            <Text className="text-sm font-medium text-gray-700">Email</Text>
            <View
              className={`relative flex-row items-center rounded-xl border h-12 px-4 ${!isEmailValid && touched.email ? 'border-red-500' : 'border-gray-200'}`}
            >
              <Ionicons name="mail-outline" size={20} color="#6B7280" className="absolute left-3 top-1/2 -translate-y-1/2" />
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
                className="flex-1 text-base text-text-body pl-10 h-full rounded-xl"
              />
            </View>
            {!isEmailValid && touched.email && (
              <Text className="text-xs text-red-500 mt-1 ml-3">Invalid email format</Text>
            )}
          </View>

          <View className="w-full max-w-md mb-6 space-y-2">
            <Text className="text-sm font-medium text-gray-700">Password</Text>
            <View className="relative flex-row items-center border border-gray-200 rounded-xl h-12 px-4">
              <Ionicons name="lock-closed-outline" size={20} color="#6B7280" className="absolute left-3 top-1/2 -translate-y-1/2" />
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={handlePasswordChange}
                className="flex-1 text-base text-text-body pl-10 pr-10 h-full rounded-xl"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="w-full max-w-md space-y-4">
            <PrimaryButton
              size="large"
              variant="primary"
              gradient={true}
              width="full"
              onPress={handleUserLogin}
              onLongPress={() => setShowAdminButton(true)}
              isLoading={isLoading}
              loadingText="Logging in..."
              disabled={!isFormValid()}
            >
              Log In
            </PrimaryButton>

            {showAdminButton && (
              <PrimaryButton
                size="large"
                variant="secondary"
                gradient={true}
                width="full"
                onPress={handleAdminLogin}
                isLoading={isAdminLoading}
                loadingText="Logging in as admin..."
                disabled={!isFormValid()}
              >
                Log In as Admin
              </PrimaryButton>
            )}

            <TouchableOpacity className="items-center mt-2">
              <Text className="text-blue-500 font-semibold">Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center my-6 w-full max-w-md">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-4 text-gray-500">or</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          <PrimaryButton
            size="large"
            variant="outline"
            width="full"
            onPress={() => navigation.navigate('Register')}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="person-add-outline" size={20} color="black" />
              <Text className="text-black font-semibold ml-2">Sign Up</Text>
            </View>
          </PrimaryButton>

          <TouchableOpacity className="flex-row items-center mt-8">
            <Ionicons name="person-outline" size={20} color="black" />
            <Text className="text-black text-base ml-2">Continue as Guest</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default Login
