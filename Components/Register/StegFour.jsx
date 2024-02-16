import { View, Text, Pressable, Modal, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Input from '../../Utilities/UI/Input'
import PrimaryButton from '../../Utilities/UI/PrimaryButton'
import { useDispatch, useSelector } from 'react-redux'
import { updateStepFourData } from '../../Utilities/Redux/Slices/registrationSlice'

const StegFour = ({ styles, goToNextStep, goToPreviousStep }) => {
  const dispatch = useDispatch()
  const { phoneNumber, address, city, zipCode } = useSelector(
    state => state.registration
  )
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    if (address.trim().length > 0 && city.trim().length > 0) {
      setUserInfo({
        phoneNumber: phoneNumber,
        address: address,
        city: city,
        zipCode: zipCode,
      })
    }
  }, [phoneNumber, address, city, zipCode])

  const handleNext = () => {
    dispatch(
      updateStepFourData({
        phoneNumber: userInfo.phoneNumber,
        address: userInfo.address,
        city: userInfo.city,
        zipCode: userInfo.zipCode,
      })
    )
    goToNextStep()
  }

  return (
    <>
      <Input
        label='Phone Number'
        value={userInfo.phoneNumber}
        onChangeText={e => {
          setUserInfo({
            ...userInfo,
            phoneNumber: e,
          })
        }}
        textInputConfig={{
          keyboardType: 'phone-pad',
          autoCorrect: false,
        }}
      />
      <Input
        label='Address'
        value={userInfo.address}
        onChangeText={e => {
          setUserInfo({
            ...userInfo,
            address: e,
          })
        }}
        textInputConfig={{
          autoCorrect: false,
        }}
      />
      <Input
        label='City'
        value={userInfo.city}
        onChangeText={e => {
          setUserInfo({
            ...userInfo,
            city: e,
          })
        }}
        textInputConfig={{
          autoCorrect: false,
        }}
      />
      <Input
        label='Zip Code'
        value={userInfo.zipCode}
        onChangeText={e => {
          setUserInfo({
            ...userInfo,
            zipCode: e,
          })
        }}
        textInputConfig={{
          keyboardType: 'phone-pad',
          autoCorrect: false,
        }}
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

export default StegFour
