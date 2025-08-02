import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Feather } from '@expo/vector-icons'
import PrimaryButton from '../../Utilities/UI/PrimaryButton'
import YupPassword from 'yup-password'
YupPassword(yup)

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup.string().password().required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Please re-type your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
})

export default function StepOne({ goToNextStep, initialData }) {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  const handleFormSubmit = (values) => {
    // Store form data for next step
    goToNextStep(values)
  }

  return (
    <View className="w-full">
      <Formik
        initialValues={{ 
          firstName: initialData?.firstName || '', 
          lastName: initialData?.lastName || '', 
          email: initialData?.email || '', 
          password: initialData?.password || '', 
          confirmPassword: initialData?.confirmPassword || '' 
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View className="w-full">
            {/* First Name */}
            <View className="mb-5">
              <Text className="text-sm text-text-subtitle font-medium mb-2">
                First Name <Text className="text-feedback-error">*</Text>
              </Text>
              <View className="relative">
                <View className="absolute left-3 top-4 z-10">
                  <Feather name="user" size={18} color="#6B7280" />
                </View>
                <TextInput
                  placeholder="Enter your first name"
                  placeholderTextColor="#9CA3AF"
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  className="border border-surface-secondary rounded-lg pl-12 pr-4 py-4 text-text-title bg-surface-primary"
                />
              </View>
              {errors.firstName && touched.firstName && (
                <Text className="text-feedback-error text-sm mt-1">{errors.firstName}</Text>
              )}
            </View>

            {/* Last Name */}
            <View className="mb-5">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Last Name <Text className="text-feedback-error">*</Text>
              </Text>
              <View className="relative">
                <View className="absolute left-3 top-4 z-10">
                  <Feather name="user" size={18} color="#6B7280" />
                </View>
                <TextInput
                  placeholder="Enter your last name"
                  placeholderTextColor="#9CA3AF"
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  className="border border-surface-secondary rounded-lg pl-12 pr-4 py-4 text-text-title bg-surface-primary"
                />
              </View>
              {errors.lastName && touched.lastName && (
                <Text className="text-feedback-error text-sm mt-1">{errors.lastName}</Text>
              )}
            </View>

            {/* Email Address */}
            <View className="mb-5">
              <Text className="text-sm text-text-subtitle font-medium mb-2">
                Email Address <Text className="text-feedback-error">*</Text>
              </Text>
              <View className="relative">
                <View className="absolute left-3 top-4 z-10">
                  <Feather name="mail" size={18} color="#6B7280" />
                </View>
                <TextInput
                  placeholder="Enter your email address"
                  placeholderTextColor="#9CA3AF"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  className="border border-surface-secondary rounded-lg pl-12 pr-4 py-4 text-text-title bg-surface-primary"
                />
              </View>
              {errors.email && touched.email && (
                <Text className="text-feedback-error text-sm mt-1">{errors.email}</Text>
              )}
            </View>

            {/* Password */}
            <View className="mb-5">
              <Text className="text-sm text-text-subtitle font-medium mb-2">
                Password <Text className="text-feedback-error">*</Text>
              </Text>
              <View className="relative">
                <View className="absolute left-3 top-4 z-10">
                  <Feather name="lock" size={18} color="#6B7280" />
                </View>
                <TextInput
                  placeholder="Create a password"
                  placeholderTextColor="#9CA3AF"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={!passwordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                  className="border border-surface-secondary rounded-lg pl-12 pr-12 py-4 text-text-title bg-surface-primary"
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-4"
                >
                  <Feather name={passwordVisible ? "eye-off" : "eye"} size={18} color="#6B7280" />
                </TouchableOpacity>
              </View>
              {errors.password && touched.password && (
                <Text className="text-feedback-error text-sm mt-1">{errors.password}</Text>
              )}
            </View>

            {/* Confirm Password */}
            <View className="mb-5">
              <Text className="text-sm text-text-subtitle font-medium mb-2">
                Confirm Password <Text className="text-feedback-error">*</Text>
              </Text>
              <View className="relative">
                <View className="absolute left-3 top-4 z-10">
                  <Feather name="lock" size={18} color="#6B7280" />
                </View>
                <TextInput
                  placeholder="Confirm your password"
                  placeholderTextColor="#9CA3AF"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry={!confirmPasswordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                  className="border border-surface-secondary rounded-lg pl-12 pr-12 py-4 text-text-title bg-surface-primary"
                />
                <TouchableOpacity
                  onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                  className="absolute right-3 top-4"
                >
                  <Feather name={confirmPasswordVisible ? "eye-off" : "eye"} size={18} color="#6B7280" />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && touched.confirmPassword && (
                <Text className="text-feedback-error text-sm mt-1">{errors.confirmPassword}</Text>
              )}
            </View>

            <View className="mt-8">
              <PrimaryButton 
                onPress={handleSubmit}
                size="large"
              >
                Continue
              </PrimaryButton>
            </View>
          </View>
        )}
      </Formik>
    </View>
  )
}
