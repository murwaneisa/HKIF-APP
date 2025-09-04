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
  SafeAreaView,
  ScrollView,
} from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import PrimaryButton from '../Utilities/UI/PrimaryButton'
import { dismissKeyboard } from '../Utilities/UI/Form'
import { useDispatch, useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import { loginAndSetUser } from '../Utilities/Redux/Actions/userActions'
import { loginAndSetAdmin } from '../Utilities/Redux/Actions/adminActions'
import { Ionicons } from '@expo/vector-icons'
import SecondaryButton from '../Utilities/UI/SecondaryButton'

// TODO: make the text input for the password and email appear in the center fo the IOS devices

const validationSchema = yup.object().shape({
  email: yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup.string()
    .required('Password is required'),
})

function Login({ navigation }) {
  const [showAdminButton, setShowAdminButton] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isAdminLoading, setIsAdminLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()
  const route = useRoute()
  
  // Get selected organization from route params or Redux state
  const routeOrganization = route.params?.selectedOrganization
  const selectedOrganization = useSelector(state => state.organization.selectedOrganization)
  const organization = routeOrganization || selectedOrganization

  const handleUserLogin = async (values) => {
    setIsLoading(true)
    try {
      await dispatch(loginAndSetUser(values.email, values.password))
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex-1 px-6 items-center pt-4">
              <View className="h-28 w-28 mb-6 items-center justify-center rounded-full border-4 border-accent-deep overflow-hidden bg-gray-100">
                {organization?.logoUrl ? (
                  <Image
                    source={{ uri: organization.logoUrl }}
                    resizeMode="contain" 
                    className="h-full w-full rounded-full"
                  />
                ) : (
                  <Text className="text-4xl font-bold text-gray-600">
                    {organization?.name?.charAt(0)?.toUpperCase() || 'O'}
                  </Text>
                )}
              </View>

              <Text className="text-2xl md:text-3xl font-bold text-text-title mb-1">
                Welcome Back
              </Text>
              <Text className="text-base text-gray-500 mb-6">
                Sign in to {organization?.name || 'your organization'}
              </Text>

              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleUserLogin}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <>
                    <View className="w-full max-w-md mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">Email</Text>
                <View
                  className={`relative flex-row items-center rounded-xl border h-14 px-4 ${errors.email && touched.email ? 'border-red-500' : 'border-gray-200'}`}
                >
                  <Ionicons 
                    name="mail-outline" 
                    size={20} 
                    color="#6B7280" 
                    style={{ marginRight: 10 }}
                  />
                  <TextInput
                    placeholder="Enter your email"
                    placeholderTextColor="#9CA3AF"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    className="flex-1 text-base text-text-body"
                    style={{
                      height: '100%',
                      paddingVertical: Platform.OS === 'ios' ? 0 : 8,
                      textAlignVertical: Platform.OS === 'android' ? 'center' : 'auto',
                      lineHeight: Platform.OS === 'ios' ? 20 : undefined,
                    }}
                  />
                </View>
                {errors.email && touched.email && (
                  <Text className="text-xs text-red-500 mt-1 ml-3">{errors.email}</Text>
                )}
              </View>

              <View className="w-full max-w-md mb-6">
                <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
                <View className={`relative flex-row items-center border rounded-xl h-14 px-4 ${errors.password && touched.password ? 'border-red-500' : 'border-gray-200'}`}>
                  <Ionicons 
                    name="lock-closed-outline" 
                    size={20} 
                    color="#6B7280" 
                    style={{ marginRight: 10 }}
                  />
                  <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showPassword}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    autoCapitalize="none"
                    autoCorrect={false}
                    className="flex-1 text-base text-text-body"
                    style={{
                      height: '100%',
                      paddingVertical: Platform.OS === 'ios' ? 0 : 8,
                      textAlignVertical: Platform.OS === 'android' ? 'center' : 'auto',
                      lineHeight: Platform.OS === 'ios' ? 20 : undefined,
                      paddingRight: 40,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: 12,
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 30,
                    }}
                  >
                    <Ionicons 
                      name={showPassword ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color="#9CA3AF" 
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && touched.password && (
                  <Text className="text-xs text-red-500 mt-1 ml-3">{errors.password}</Text>
                )}
              </View>

              <View className="w-full max-w-md mb-6">
                <PrimaryButton
                  onPress={handleSubmit}
                  size="large"
                  variant="primary"
                  width="full"
                  isLoading={isLoading}
                  loadingText="Logging in..."
                >
                  Log In
                </PrimaryButton>

                <TouchableOpacity className="items-center mt-4">
                  <Text className="text-blue-500 font-semibold">Forgot Password?</Text>
                </TouchableOpacity>
              </View>
                  </>
                )}
              </Formik>

              <View className="flex-row items-center my-6 w-full max-w-md">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="mx-4 text-gray-500">or</Text>
                <View className="flex-1 h-px bg-gray-300" />
              </View>

              <View className="w-full max-w-md mb-4">
                <SecondaryButton
                  size="large"
                  width="full"
                  variant="outline"
                  onPress={() => navigation.navigate('Register')}
                  icon={<Ionicons name="person-add-outline" size={22} color="#2082E4" />}
                >
                  Sign up for membership
                </SecondaryButton>
              </View>

              <TouchableOpacity className="flex-row items-center mt-4 mb-8">
                <Ionicons name="person-outline" size={20} color="black" />
                <Text className="text-black text-base ml-2">Continue as Guest</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Login