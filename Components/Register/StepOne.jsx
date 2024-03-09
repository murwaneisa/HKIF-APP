import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Input from '../../Utilities/UI/Input'
import PrimaryButton from '../../Utilities/UI/PrimaryButton'
import GoogleButton from '../../Utilities/UI/GoogleButton'
import { useDispatch, useSelector } from 'react-redux'
import { updateStepOneData } from '../../Utilities/Redux/Slices/registrationSlice'
import { Formik } from 'formik'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  firstName: yup.string().required('Please enter a first name'),
  lastName: yup.string().required('Please enter a last name'),
})

const stepOne = ({ styles, goToNextStep }) => {
  const dispatch = useDispatch()
  const { firstName, lastName } = useSelector(state => state.registration)
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
  })

  useEffect(() => {
    setUserInfo({ firstName: firstName || '', lastName: lastName || '' })
  }, [firstName, lastName])

  const handleFormSubmit = async values => {
    try {
      dispatch(updateStepOneData({ ...values }))
      goToNextStep()
    } catch (err) {
      console.log(err)
    }
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
            label='First Name'
            value={values.firstName}
            onBlur={handleBlur('firstName')}
            onChangeText={handleChange('firstName')}
            autoCorrect={false}
            autoCapitalize={'words'}
          />
          {errors.firstName && touched.firstName && (
            <Text style={styles.errorText}>{errors.firstName}</Text>
          )}
          <Input
            label='Last Name'
            value={values.lastName}
            onBlur={handleBlur('lastName')}
            onChangeText={handleChange('lastName')}
            autoCorrect={false}
            autoCapitalize={'words'}
          />
          {errors.lastName && touched.lastName && (
            <Text style={styles.errorText}>{errors.lastName}</Text>
          )}
          <View style={styles.buttonsContainer}>
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
            <Text style={styles.textStyle}>OR </Text>
            <View style={styles.buttonWrapper}>
              <GoogleButton paddingVertical={98} paddingHorizontal={12}>
                Sign Up with Google
              </GoogleButton>
            </View>
          </View>
        </>
      )}
    </Formik>
  )
}

export default stepOne
