import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Input from '../../Utilities/UI/Input'
import PrimaryButton from '../../Utilities/UI/PrimaryButton'
import { useDispatch, useSelector } from 'react-redux'
import { updateStepTwoData } from '../../Utilities/Redux/Slices/registrationSlice'
import { Feather } from '@expo/vector-icons'
import { Formik } from 'formik'
import * as yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(yup)

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup.string().password().required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Please re-type your password')
    .oneOf([yup.ref('password')], 'Passwords does not match'),
})

const StepTwo = ({ styles, goToNextStep, goToPreviousStep }) => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  const dispatch = useDispatch()
  const { email, password } = useSelector(state => state.registration)
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  useEffect(() => {
    setUserInfo({ email: email || '', password: password || '' })
  }, [email, password])

  const handleFormSubmit = async values => {
    try {
      dispatch(updateStepTwoData({ ...values }))
      goToNextStep()
    } catch (err) {
      console.log(err)
    }
  }

  const RightIcon = ({ visible, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Feather name={!visible ? 'eye' : 'eye-off'} size={18} color='black' />
      </TouchableOpacity>
    )
  }

  return (
    <Formik
      initialValues={userInfo}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <>
          <Input
            label='Email Address'
            value={values.email}
            onBlur={handleBlur('email')}
            onChangeText={handleChange('email')}
            autoCorrect={false}
            keyboardType='email-address'
          />
          {errors.email && touched.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
          <Input
            label='Password'
            value={values.password}
            onBlur={handleBlur('password')}
            onChangeText={handleChange('password')}
            secureTextEntry={!passwordVisible}
            autoCapitalize={'none'}
            autoCorrect={false}
            returnKeyType={'done'}
            rightIcon={
              <RightIcon
                visible={passwordVisible}
                onPress={() => setPasswordVisible(prev => !prev)}
              />
            }
          />
          {errors.password && touched.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          <Input
            label='Confirm Password'
            value={values.confirmPassword}
            onBlur={handleBlur('confirmPassword')}
            onChangeText={handleChange('confirmPassword')}
            secureTextEntry={!confirmPasswordVisible}
            autoCapitalize={'none'}
            autoCorrect={false}
            returnKeyType={'done'}
            rightIcon={
              <RightIcon
                visible={confirmPasswordVisible}
                onPress={() => setConfirmPasswordVisible(prev => !prev)}
              />
            }
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
          <View style={[styles.buttonsContainer]}>
            <View style={styles.buttonWrapper}>
              <PrimaryButton
                style={{ marginBottom: 10, width: '100%' }}
                paddingVertical={40}
                paddingHorizontal={12}
                onPress={handleSubmit}
              >
                Continue
              </PrimaryButton>
            </View>
            <View style={styles.buttonWrapper}>
              <PrimaryButton
                style={{ marginBottom: 10, width: '100%' }}
                paddingVertical={40}
                paddingHorizontal={12}
                onPress={goToPreviousStep}
              >
                Previous
              </PrimaryButton>
            </View>
          </View>
        </>
      )}
    </Formik>
  )
}

export default StepTwo
