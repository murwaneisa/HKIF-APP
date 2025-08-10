import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Platform, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Feather } from '@expo/vector-icons'
import PrimaryButton from '../../Utilities/UI/PrimaryButton'
import SecondaryButton from '../../Utilities/UI/SecondaryButton'
import DropdownList from '../../Utilities/UI/DropDownList'
import countries from '../../Assets/Countries'
import RNDateTimePicker from '@react-native-community/datetimepicker'

const validationSchema = yup.object().shape({
  phoneNumber: yup.string().matches(/^\+?[\d\s-()]+$/, 'Invalid phone number format'),
  birthDate: yup.date().max(new Date(), 'Birth date cannot be in the future'),
  gender: yup.string().oneOf(['male', 'female', 'other'], 'Please select a gender'),
  nationality: yup.string(),
  address: yup.string(),
  city: yup.string(),
  zipCode: yup.string(),
})

const StepTwo = ({ goToNextStep, goToPreviousStep, stepOneData, initialData }) => {
  const navigation = useNavigation()
  const [showDatePicker, setShowDatePicker] = useState(false)

  const handleFormSubmit = async (values) => {
    try {
      if (goToNextStep) {
        // If there's a next step, save the data and continue
        goToNextStep(values)
      } else {
        // Final submission - combine all data
        const completeData = { ...stepOneData, ...values }
        console.log('Complete registration data:', completeData)
        // Handle final submission here
      }
    } catch (err) {
      console.log(err)
    }
  }

  const formatDate = (date) => {
    if (!date) return 'Pick a date'
    return date.toLocaleDateString()
  }

  return (
    <View className="w-full">
      <Formik
        initialValues={{
          phoneNumber: initialData?.phoneNumber || '',
          dialCode: initialData?.dialCode || '+46',
          birthDate: initialData?.birthDate || null,
          gender: initialData?.gender || '',
          nationality: initialData?.nationality || '',
          address: initialData?.address || '',
          city: initialData?.city || '',
          zipCode: initialData?.zipCode || '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <View className="w-full">
            {/* Phone Number with Dial Code */}
            <View className="mb-5">
              <Text className="text-sm text-text-subtitle font-medium mb-2">Phone</Text>
              <View className="flex-row items-center">
                <View className="flex-1 mr-3">
                  <DropdownList
                    placeholder="Code"
                    value={values.dialCode}
                    handleChange={(val) => setFieldValue('dialCode', val)}
                    data={countries}
                    containerClassName=""
                    dropdownClassName="border border-surface-secondary rounded-lg px-3 py-3 bg-surface-primary"
                    labelField="dialCode"
                    valueField="dialCode"
                    renderItem={(item) => (
                      <View className="flex-row items-center p-2">
                        <Text style={{ fontSize: 18, marginRight: 8 }}>{item.flag}</Text>
                        <Text style={{ fontSize: 14, color: '#6B7280' }}>{item.dialCode}</Text>
                      </View>
                    )}
                  />
                </View>
                <View className="flex-[2]">
                  <View className="relative">
                    <View className="absolute left-3 top-4 z-10">
                      <Feather name="phone" size={18} color="#6B7280" />
                    </View>
                    <TextInput
                      placeholder="Enter your phone number"
                      placeholderTextColor="#9CA3AF"
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      value={values.phoneNumber}
                      keyboardType="phone-pad"
                      className="border border-surface-secondary rounded-lg pl-12 pr-4 py-4 text-text-title bg-surface-primary"
                    />
                  </View>
                </View>
              </View>
              {errors.phoneNumber && touched.phoneNumber && (
                <Text className="text-feedback-error text-sm mt-1">{errors.phoneNumber}</Text>
              )}
            </View>

            {/* Birth Date */}
            <View className="mb-5">
              <Text className="text-sm text-text-subtitle font-medium mb-2">Birth Date</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                className="border border-surface-secondary rounded-lg px-4 py-4 bg-surface-primary flex-row items-center"
              >
                <View className="mr-3">
                  <Feather name="calendar" size={18} color="#6B7280" />
                </View>
                <Text className={`flex-1 ${values.birthDate ? 'text-text-title' : 'text-text-disabled'}`}>
                  {formatDate(values.birthDate)}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <View>
                  <RNDateTimePicker
                    value={values.birthDate || new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, selectedDate) => {
                      if (Platform.OS === 'android') {
                        setShowDatePicker(false)
                      }
                      if (selectedDate) {
                        setFieldValue('birthDate', selectedDate)
                      }
                    }}
                    maximumDate={new Date()}
                  />
                  {Platform.OS === 'ios' && (
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(false)}
                      className="bg-brand rounded-lg py-3 mt-4"
                    >
                      <Text className="text-white text-center font-semibold">Done</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {errors.birthDate && touched.birthDate && (
                <Text className="text-feedback-error text-sm mt-1">{errors.birthDate}</Text>
              )}
            </View>

            {/* Gender */}
            <View className="mb-5">
              <Text className="text-sm text-text-subtitle font-medium mb-2">Gender</Text>
              <View className="flex-row space-x-4">
                {['male', 'female', 'other'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => setFieldValue('gender', option)}
                    className="flex-row items-center px-2"
                  >
                    <View className={`w-5 h-5 rounded-full border-2 mr-2 items-center justify-center ${
                      values.gender === option ? 'border-brand bg-brand' : 'border-surface-secondary'
                    }`}>
                      {values.gender === option && (
                        <View className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </View>
                    <Text className="text-text-title capitalize">{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.gender && touched.gender && (
                <Text className="text-feedback-error text-sm mt-1">{errors.gender}</Text>
              )}
            </View>

            {/* Nationality */}
            <View className="mb-2">
              <Text className="text-sm text-text-subtitle font-medium mb-2">Nationality</Text>
              <DropdownList
                placeholder="Select your country"
                value={values.nationality}
                handleChange={(val) => setFieldValue('nationality', val)}
                data={countries}
                containerClassName="mb-6"
                dropdownClassName="border border-surface-secondary rounded-lg px-4 py-4 bg-surface-primary"
                showSelectedOnRight
                leftIcon={(item) => (
                  <View className="flex-row items-center">
                    {item?.flag ? (
                      <Text style={{ fontSize: 18, marginRight: 8 }}>{item.flag}</Text>
                    ) : (
                      <Feather name="globe" size={18} color="#6B7280" style={{ marginRight: 8 }} />
                    )}
                    <Text style={{ fontSize: 16, color: '#111827' }}>{item?.label ?? ''}</Text>
                  </View>
                )}
                renderRightIconFromItem={() => (
                  <Feather name="chevron-down" size={18} color="#6B7280" />
                )}
                renderItem={(item) => (
                  <View className="flex-row items-center p-2">
                    {item.flag ? (
                      <Text style={{ fontSize: 18, marginRight: 8 }}>{item.flag}</Text>
                    ) : (
                      <Feather name="globe" size={18} color="#6B7280" style={{ marginRight: 8 }} />
                    )}
                    <Text style={{ fontSize: 16, color: '#111827' }}>{item.label}</Text>
                  </View>
                )}
              />
              {errors.nationality && touched.nationality && (
                <Text className="text-feedback-error text-sm mt-1">{errors.nationality}</Text>
              )}
            </View>

            {/* Address Information Section */}
            <View>
              <Text className="text-text-title text-lg font-semibold mb-5">Address Information</Text>
              
              {/* Address */}
              <View className="mb-5">
                <Text className="text-sm text-text-subtitle font-medium mb-2">Address</Text>
                <View className="relative">
                  <View className="absolute left-3 top-4 z-10">
                    <Feather name="map-pin" size={18} color="#6B7280" />
                  </View>
                  <TextInput
                    placeholder="Enter your address"
                    placeholderTextColor="#9CA3AF"
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    value={values.address}
                    className="border border-surface-secondary rounded-lg pl-12 pr-4 py-4 text-text-title bg-surface-primary"
                  />
                </View>
                {errors.address && touched.address && (
                  <Text className="text-feedback-error text-sm mt-1">{errors.address}</Text>
                )}
              </View>

              {/* City */}
              <View className="mb-5">
                <Text className="text-sm text-text-subtitle font-medium mb-2">City</Text>
                <TextInput
                  placeholder="Enter your city"
                  placeholderTextColor="#9CA3AF"
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                  value={values.city}
                  className="border border-surface-secondary rounded-lg px-4 py-4 text-text-title bg-surface-primary"
                />
                {errors.city && touched.city && (
                  <Text className="text-feedback-error text-sm mt-1">{errors.city}</Text>
                )}
              </View>

              {/* Zip Code */}
              <View>
                <Text className="text-sm text-text-subtitle font-medium mb-2">Zip Code</Text>
                <TextInput
                  placeholder="Enter zip code"
                  placeholderTextColor="#9CA3AF"
                  onChangeText={handleChange('zipCode')}
                  onBlur={handleBlur('zipCode')}
                  value={values.zipCode}
                  className="border border-surface-secondary rounded-lg px-4 py-4 text-text-title bg-surface-primary"
                />
                {errors.zipCode && touched.zipCode && (
                  <Text className="text-feedback-error text-sm mt-1">{errors.zipCode}</Text>
                )}
              </View>
            </View>

            {/* Action Buttons */}
            <View className="mt-8">
              {/* Submit Button */}
              <PrimaryButton 
                onPress={handleSubmit}
                size="large"
              >
                Submit your application
              </PrimaryButton>
                               {/* Back Button */}
                <SecondaryButton 
                  onPress={goToPreviousStep}
                  size="large"
                  icon={<Feather name="arrow-left" size={18} color="#2082E4" />}
                  className="mt-4"
                >
                 Go back
                </SecondaryButton>
            </View>

            {/* Terms and Privacy Policy */}
            <View className="mt-6">
              <Text className="text-text-secondary text-sm text-center">
                By submitting this application, you agree to our{' '}
                <Text className="text-brand underline">Terms of Service</Text> and{' '}
                <Text className="text-brand underline">Privacy Policy</Text>
              </Text>
            </View>
          </View>
        )}
      </Formik>
    </View>
  )
}

export default StepTwo
