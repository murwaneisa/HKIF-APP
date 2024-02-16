import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Input from '../../Utilities/UI/Input'
import PrimaryButton from '../../Utilities/UI/PrimaryButton'
import GoogleButton from '../../Utilities/UI/GoogleButton'
import { useDispatch, useSelector } from 'react-redux'
import { updateStepOneData } from '../../Utilities/Redux/Slices/registrationSlice'

const StegOne = ({ styles, goToNextStep }) => {
  const dispatch = useDispatch()
  const { firstName, lastName } = useSelector(state => state.registration)
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
  })

  useEffect(() => {
    if (firstName.trim().length > 0 && lastName.trim().length > 0) {
      setUserInfo({ firstName: firstName, lastName: lastName })
    }
  }, [firstName, lastName])

  const handleNext = () => {
    dispatch(
      updateStepOneData({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
      })
    )
    goToNextStep()
  }

  return (
    <>
      <Input
        label='First Name'
        value={userInfo.firstName}
        onChangeText={e => {
          setUserInfo({
            ...userInfo,
            firstName: e,
          })
        }}
        textInputConfig={{
          autoCorrect: false,
          autoCapitalize: 'words',
        }}
      />
      <Input
        label='Last Name'
        value={userInfo.lastName}
        onChangeText={e => {
          setUserInfo({
            ...userInfo,
            lastName: e,
          })
        }}
        textInputConfig={{
          autoCorrect: false,
          autoCapitalize: 'words',
        }}
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonWrapper}>
          <PrimaryButton
            style={{ marginBottom: 10, width: '100%' }}
            paddingVertical={40}
            paddingHorizontal={12}
            onPress={handleNext}
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
  )
}

export default StegOne
