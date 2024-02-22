import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Input from '../../Utilities/UI/Input'
import PrimaryButton from '../../Utilities/UI/PrimaryButton'
import { useDispatch, useSelector } from 'react-redux'
import { updateStepTwoData } from '../../Utilities/Redux/Slices/registrationSlice'
import { Feather } from '@expo/vector-icons'

const StegTwo = ({ styles, goToNextStep, goToPreviousStep }) => {
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
    if (email.trim().length > 0 && password.trim().length > 0) {
      setUserInfo({ email: email, password: password })
    }
  }, [email, password])

  const handleNext = () => {
    dispatch(
      updateStepTwoData({
        email: userInfo.email,
        password: userInfo.password,
      })
    )
    goToNextStep()
  }

  const RightIcon = ({ visible, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Feather name={!visible ? 'eye' : 'eye-off'} size={18} color='black' />
      </TouchableOpacity>
    )
  }

  return (
    <>
      <Input
        label='Email Address'
        value={userInfo.email}
        onChangeText={e => {
          setUserInfo({
            ...userInfo,
            email: e,
          })
        }}
        textInputConfig={{
          autoCorrect: false,
        }}
      />
      <Input
        label='Password'
        value={userInfo.password}
        onChangeText={e => {
          setUserInfo({
            ...userInfo,
            password: e,
          })
        }}
        textInputConfig={{
          secureTextEntry: !passwordVisible,
          autoCapitalize: 'none',
          autoCorrect: false,
          returnKeyType: 'done',
        }}
        rightIcon={
          <RightIcon
            visible={passwordVisible}
            onPress={() => setPasswordVisible(prev => !prev)}
          />
        }
      />
      <Input
        label='Confirm Password'
        value={userInfo.confirmPassword}
        onChangeText={e => {
          setUserInfo({
            ...userInfo,
            confirmPassword: e,
          })
        }}
        textInputConfig={{
          secureTextEntry: !confirmPasswordVisible,
          autoCapitalize: 'none',
          autoCorrect: false,
          returnKeyType: 'done',
        }}
        rightIcon={
          <RightIcon
            visible={confirmPasswordVisible}
            onPress={() => setConfirmPasswordVisible(prev => !prev)}
          />
        }
      />
      <View style={[styles.buttonsContainer]}>
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
  )
}

export default StegTwo
