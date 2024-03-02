import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PrimaryButton from '../../Utilities/UI/PrimaryButton'
import DropdownList from '../../Utilities/UI/DropDownList'
import Countries from '../../Assets/Countries'
import { useDispatch, useSelector } from 'react-redux'
import { updateStepThreeData } from '../../Utilities/Redux/Slices/registrationSlice'
import DatePickerInput from '../../Utilities/UI/DatePickerInput'
import { Formik } from 'formik'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  gender: yup.string().required('Gender is required'),
  nationality: yup.string().required('Nationality is required'),
})

const StegThree = ({ styles, goToNextStep, goToPreviousStep }) => {
  const dispatch = useDispatch()
  const { birthDate, gender, nationality } = useSelector(
    state => state.registration
  )
  const [userInfo, setUserInfo] = useState({
    birthDate: new Date(),
    gender: '',
    nationality: '',
  })

  useEffect(() => {
    setUserInfo({
      birthDate: birthDate || new Date(),
      gender: gender || '',
      nationality: nationality || '',
    })
  }, [birthDate, gender, nationality])

  const handleFormSubmit = async values => {
    try {
      dispatch(updateStepThreeData({ ...values }))
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
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <>
          <DatePickerInput
            label={'Birth Date'}
            value={values.birthDate}
            handleChange={setFieldValue}
          />
          {errors.birthDate && touched.birthDate && (
            <Text style={styles.errorText}>{errors.birthDate}</Text>
          )}
          <DropdownList
            label='Gender'
            placeholder='Select Gender'
            data={[
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
              { label: 'Other', value: 'Other' },
            ]}
            value={values.gender}
            handleChange={handleChange('gender')}
          />
          {errors.gender && touched.gender && (
            <Text style={styles.errorText}>{errors.gender}</Text>
          )}
          <DropdownList
            label='Nationality'
            placeholder='Select country'
            data={Countries}
            value={values.nationality}
            handleChange={handleChange('nationality')}
          />
          {errors.nationality && touched.nationality && (
            <Text style={styles.errorText}>{errors.nationality}</Text>
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

export default StegThree
