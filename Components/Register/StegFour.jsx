import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Input from '../../Utilities/UI/Input'
import PrimaryButton from '../../Utilities/UI/PrimaryButton'
import { useDispatch, useSelector } from 'react-redux'
import { updateStepFourData } from '../../Utilities/Redux/Slices/registrationSlice'
import * as yup from 'yup'
import { Formik } from 'formik'

const validationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, 'Please enter a valid 10-digit phone number')
    .required('Phone number is required'),
  address: yup.string().required('Please enter an address'),
  city: yup.string().required('Please enter a city'),
  zipCode: yup.string().required('Please enter a zip-code'),
})

const StegFour = ({ styles, goToNextStep, goToPreviousStep }) => {
  const dispatch = useDispatch()
  const { phoneNumber, address, city, zipCode } = useSelector(
    state => state.registration
  )
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    setUserInfo({
      phoneNumber: phoneNumber || '',
      address: address || '',
      city: city || '',
      zipCode: zipCode || '',
    })
  }, [phoneNumber, address, city, zipCode])

  const handleFormSubmit = async values => {
    try {
      dispatch(updateStepFourData({ ...values }))
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
            label='Phone Number'
            value={values.phoneNumber}
            onBlur={handleBlur('phoneNumber')}
            onChangeText={handleChange('phoneNumber')}
            keyboardType={'phone-pad'}
            autoCorrect={false}
          />
          {errors.phoneNumber && touched.phoneNumber && (
            <Text style={styles.errorText}>{errors.phoneNumber}</Text>
          )}
          <Input
            label='Address'
            value={values.address}
            onBlur={handleBlur('address')}
            onChangeText={handleChange('address')}
            autoCorrect={false}
          />
          {errors.address && touched.address && (
            <Text style={styles.errorText}>{errors.address}</Text>
          )}
          <Input
            label='City'
            value={values.city}
            onBlur={handleBlur('city')}
            onChangeText={handleChange('city')}
            autoCorrect={false}
          />
          {errors.city && touched.city && (
            <Text style={styles.errorText}>{errors.city}</Text>
          )}
          <Input
            label='Zip Code'
            value={values.zipCode}
            onBlur={handleBlur('zipCode')}
            onChangeText={handleChange('zipCode')}
            keyboardType={'phone-pad'}
            autoCorrect={false}
          />
          {errors.zipCode && touched.zipCode && (
            <Text style={styles.errorText}>{errors.zipCode}</Text>
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

export default StegFour
