import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PrimaryButton from '../../Utilities/UI/PrimaryButton'
import DropdownList from '../../Utilities/UI/DropDownList'
import { useDispatch, useSelector } from 'react-redux'
import { updateStepFiveData } from '../../Utilities/Redux/Slices/registrationSlice'
import { Formik } from 'formik'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  role: yup.string().required('Role is required'),
})

const StepFive = ({ styles, goToNextStep, goToPreviousStep }) => {
  const dispatch = useDispatch()
  const { role } = useSelector(state => state.registration)
  const [userInfo, setUserInfo] = useState({
    role: '',
  })

  useEffect(() => {
    setUserInfo({ role: role || '' })
  }, [role])

  const handleFormSubmit = async values => {
    try {
      dispatch(updateStepFiveData({ ...values }))
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
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <>
          <DropdownList
            label='Role'
            placeholder='Select Role'
            data={[
              { label: 'Activity Leader', value: 'ACTIVITY_LEADER' },
              { label: 'Board Member', value: 'BOARD_MEMBER' },
              { label: 'None of the above', value: 'NONE' },
            ]}
            value={values.role}
            handleChange={handleChange('role')}
          />
          {errors.role && touched.role && (
            <Text style={styles.errorText}>{errors.role}</Text>
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

export default StepFive
