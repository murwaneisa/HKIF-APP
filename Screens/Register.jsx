import React, { useState } from 'react'
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

import { useTheme } from '../Styles/theme'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { isValidPhoneNumber } from 'libphonenumber-js'
import { getFormatedDate } from 'react-native-modern-datepicker'
import StepOne from './Components/Register/StepOne'
import StepTwo from './Components/Register/StepTwo'
import { registerUser } from '../Utilities/Axios/user'

function Register() {
  const screenWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, screenWidth)

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 2
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [isGoogleSignUp, setIsGoogleSignUp] = useState(false)
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false)

  const today = new Date()
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    'YYYY/MM/DD'
  )

  const stepOneValidationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  }).when('$isGoogleSignUp', (isGoogleSignUp, schema) => {
    return isGoogleSignUp
      ? schema.omit(['password', 'confirmPassword'])
      : schema
  })

  Yup.addMethod(Yup.object, 'phone', function (errorMessage) {
    return this.test('phone', errorMessage, function (value) {
      const { countryCode, phoneNumber } = value
      const fullPhoneNumber = `${countryCode}${phoneNumber}`
      const { path, createError } = this

      return (
        isValidPhoneNumber(fullPhoneNumber) ||
        createError({ path: 'phoneNumber', message: errorMessage })
      )
    })
  })

  const stepTwoValidationSchema = Yup.object({
    selectedStartDate: Yup.string().required('Birthday date is required'),
    gender: Yup.string()
      .oneOf(['Male', 'Female', 'Other'], 'Invalid gender')
      .required('Gender is required'),
    nationality: Yup.string().required('Nationality is required'),
    role: Yup.string().required('Role is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    zipCode: Yup.string()
      .matches(/^[0-9]+$/, 'Zip code must be numeric')
      .required('Zip code is required'),
  }).phone('Invalid phone number')

  const goToPreviousStep = () => {
    console.log(currentStep)
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    selectedStartDate: '',
    startedDate: '',
    gender: '',
    nationality: '',
    role: '',
    countryCode: '+46',
    phoneNumber: '',
    address: '',
    city: '',
    zipCode: '',
  }

  const renderStep = formikProps => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            {...formikProps}
            passwordVisible={passwordVisible}
            setPasswordVisible={setPasswordVisible}
            confirmPasswordVisible={confirmPasswordVisible}
            setConfirmPasswordVisible={setConfirmPasswordVisible}
            isGoogleSignUp={isGoogleSignUp}
            setIsGoogleSignUp={setIsGoogleSignUp}
            styles={styles}
            goToNextStep={() =>
              handleNextStep(formikProps.validateForm, formikProps.setTouched, {
                firstName: true,
                lastName: true,
                email: true,
                password: true,
                confirmPassword: true,
              })
            }
          />
        )
      case 2:
        return (
          <StepTwo
            {...formikProps}
            styles={styles}
            openStartDatePicker={openStartDatePicker}
            setOpenStartDatePicker={setOpenStartDatePicker}
            goToNextStep={() =>
              handleNextStep(
                formikProps.validateForm,
                formikProps.setTouched,
                {
                  selectedStartDate: true,
                  gender: true,
                  nationality: true,
                  role: true,
                  phoneNumber: true,
                  address: true,
                  city: true,
                  zipCode: true,
                },
                formikProps.handleSubmit
              )
            }
            goToPreviousStep={goToPreviousStep}
          />
        )
      default:
        return null
    }
  }

  const getCurrentStepValidationSchema = () => {
    switch (currentStep) {
      case 1:
        return stepOneValidationSchema
      case 2:
        return stepTwoValidationSchema
      default:
        return undefined
    }
  }

  const handleNextStep = (
    validateForm,
    setTouched,
    touchedFields,
    handleSubmit
  ) => {
    validateForm().then(errors => {
      setTouched(touchedFields)

      // Check if there are no errors for the current step fields
      const currentStepErrors = Object.keys(touchedFields).some(
        field => errors[field]
      )
      if (!currentStepErrors) {
        if (currentStep < totalSteps) {
          setCurrentStep(currentStep + 1)
        } else {
          handleSubmit()
        }
      }
    })
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Formik
              initialValues={initialValues}
              validationSchema={getCurrentStepValidationSchema()}
              onSubmit={async (values, actions) => {
                try {
                  const combinedPhone = `${values.countryCode}${values.phoneNumber}`
                  const dateString = values.selectedStartDate
                  const formattedDateString = dateString.replace(/\//g, '-') // Replace all '/' with '-'
                  const birthDateObject = new Date(formattedDateString)
                  const submitValues = {
                    ...values,
                    phoneNumber: combinedPhone,
                    birthDate: birthDateObject,
                    membershipType: 'GUEST',
                  }
                  delete submitValues.countryCode
                  delete submitValues.confirmPassword
                  delete submitValues.selectedStartDate

                  const response = await registerUser(submitValues)
                  console.log('Registration successful:', response)
                } catch (error) {
                  console.error('Registration failed:', error)
                }
                actions.setSubmitting(false)
              }}
            >
              {formikProps => <View>{renderStep(formikProps)}</View>}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    scrollViewContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      alignItems: Platform.select({
        ios: 'center',
        android: 'center',
        web: 'center',
      }),
      paddingHorizontal: '6%',
      backgroundColor: theme.colors.background,
    },
    inputContainer: {
      flex: 1,
      width: '100%',
      // Add any additional styling you need for the container of your inputs
    },
    headerText: {
      textAlign: 'center',
      color: theme.colors.text,
      fontFamily: 'Inter-Bold',
      fontSize: Platform.select({
        ios: 30,
        android: 25,
        web: 35,
      }),
      margin: Platform.select({
        ios: '5%',
        android: '5%',
        web: '3%',
      }),
    },
    hkifText: {
      color: theme.colors.primary,
    },
    headerSubText: {
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: Platform.select({
        ios: 12,
        android: 12,
        web: 30,
      }),
      margin: Platform.select({
        ios: '10%',
        android: '10%',
        web: '3%',
      }),
    },
    buttonsContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '6%',
      marginTop: Platform.select({
        ios: '6%',
        android: '6%',
        web: '3%',
      }),
    },
    buttonWrapper: {
      marginBottom: 10,
      width: Platform.select({
        ios: '70%',
        android: '70%',
        web: '40%',
      }),
      alignSelf: 'center', // This will center the button wrapper within its parent
    },
    textStyle: {
      fontFamily: 'Inter-SemiBold',
      paddingVertical: '1%',
      color: theme.colors.text,
      textAlign: 'center',
      fontSize: Platform.select({
        ios: 15,
        android: 15,
      }),
    },
    datePicker: {
      height: 120,
      marginVertical: 20,
    },
    DatePickerButton: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },

    centeredView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalView: {
      margin: 5,
      backgroundColor: '#080516',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      padding: '3%',
      width: Platform.select({
        ios: '90%',
        android: '90%',
        web: '40%',
      }),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    countryCodePicker: {
      alignSelf: 'center',
    },
    togglerContainerStyle: {
      backgroundColor: '#baffc0',
      borderRadius: 10,
      padding: 5,
    },
    togglerLabelStyle: {
      fontSize: 20,
    },
    searchInputStyle: {
      borderColor: '#888888',
      borderWidth: 1,
      height: 36,
      borderRadius: 10,
      paddingHorizontal: 10,
    },
    pickerItemLabelStyle: {
      marginLeft: 10,
      marginVertical: 10,
      alignSelf: 'center',
    },
    pickerItemContainerStyle: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignSelf: 'center',
    },
  })

export default Register
