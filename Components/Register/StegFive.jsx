import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PrimaryButton from '../../Utilities/UI/PrimaryButton'
import DropdownList from '../../Utilities/UI/DropDownList'
import { useDispatch, useSelector } from 'react-redux'
import { updateStepFiveData } from '../../Utilities/Redux/Slices/registrationSlice'

const StegFive = ({ styles, goToNextStep, goToPreviousStep }) => {
  const dispatch = useDispatch()
  const { role } = useSelector(state => state.registration)
  const [userInfo, setUserInfo] = useState({
    role: '',
  })

  useEffect(() => {
    if (role.trim().length > 0) {
      setUserInfo({
        role: role,
      })
    }
  }, [role])

  const handleNext = () => {
    dispatch(
      updateStepFiveData({
        role: userInfo.role,
      })
    )
    goToNextStep()
  }

  return (
    <>
      <DropdownList
        label='Role'
        placeholder='Select Role'
        data={[
          { label: 'Activity Leader', value: 'ACTIVITY_LEADER' },
          { label: 'Board Member', value: 'BOARD_MEMBER' },
          { label: 'None of the above', value: 'NONE' },
        ]}
        value={userInfo.role}
        handleChange={e => setUserInfo({ role: e })}
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

export default StegFive
