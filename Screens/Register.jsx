// Screens/Register.js
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Image, SafeAreaView, Dimensions, BackHandler } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import StepOne from '../Components/Register/StepOne'
import StepTwo from '../Components/Register/StepTwo'

export default function Register({ navigation }) {
  const [step, setStep] = useState(1)
  const [stepOneData, setStepOneData] = useState(null)
  const [stepTwoData, setStepTwoData] = useState(null)

  const goToNextStep = (data) => {
    if (step === 1) {
      setStepOneData(data)
    } else if (step === 2) {
      setStepTwoData(data)
    }
    setStep(prev => prev + 1)
  }

  const goToPreviousStep = () => setStep(prev => prev - 1)

  // Customize header based on current step
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            if (step === 2) {
              goToPreviousStep()
            } else {
              navigation.goBack()
            }
          }}
          style={{ marginLeft: 15, justifyContent: 'center', alignItems: 'center', height: '100%' }}
        >
          <Feather name="arrow-left" size={24} color="#6B6B6B" />
        </TouchableOpacity>
      ),
    })
  }, [navigation, step])

  // Handle hardware back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (step === 2) {
          // If on step 2, go back to step 1
          goToPreviousStep()
          return true // Prevent default back behavior
        }
        // If on step 1, allow default back behavior (exit screen)
        return false
      }

      // Add event listener
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress)

      // Cleanup function
      return () => subscription.remove()
    }, [step])
  )

  const organization = {
    id: '1',
    name: 'Manchester City FC',
    logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=80&h=80&fit=crop&crop=center',
    members: 1250,
    category: 'Football'
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          className="flex-1 bg-white" 
          contentContainerStyle={{ 
            flexGrow: 1,
            paddingBottom: Platform.OS === 'android' ? 40 : 20
          }} 
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 pt-4">
          {/* Header */}
          <View className="items-center mb-2">
            {/* Organization Logo */}
            <View className="h-28 w-28 mb-4 items-center justify-center rounded-full border-4 border-accent-deep overflow-hidden">
                 <Image
                   source={{ uri: organization.logo }}
                   resizeMode="contain"
                   className="h-full w-full rounded-full"
                 />
               </View>
            
            {/* Title and Description */}
            <Text className="text-text-title font-bold text-2xl mb-2">Join Our Organization</Text>
            <Text className="text-text-secondary text-base text-center mb-1">
              {step === 1 ? 'Step 1 of 2 - Personal Information' : 'Step 2 of 2 - Additional Information'}
            </Text>
          </View>

          {/* Step indicators */}
          <View className="flex-row items-center justify-center mb-10">
            <View className={`h-8 w-8 rounded-full justify-center items-center ${
              step >= 1 ? 'bg-brand' : 'bg-surface-secondary'
            }`}>
              {step > 1 ? (
                <Feather name="check" size={16} color="white" />
              ) : (
                <Text className="text-white font-bold">1</Text>
              )}
            </View>
            <View className={`w-12 h-1 mx-2 ${step > 1 ? 'bg-brand' : 'bg-surface-secondary'}`} />
            <View className={`h-8 w-8 rounded-full justify-center items-center ${
              step === 2 ? 'bg-brand' : 'bg-surface-secondary'
            }`}>
              <Text className={`${step === 2 ? 'text-white' : 'text-text-secondary'} font-bold`}>2</Text>
            </View>
          </View>

          {step === 1 ? (
            <StepOne goToNextStep={goToNextStep} initialData={stepOneData} />
          ) : (
            <StepTwo 
              goToNextStep={goToNextStep}
              goToPreviousStep={goToPreviousStep} 
              stepOneData={stepOneData}
              initialData={stepTwoData}
            />
          )}

          <View className="mt-8 mb-4 items-center">
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-sm text-text-secondary text-center">
                Already have an account?{' '}
                <Text className="text-brand underline">Sign in here</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}