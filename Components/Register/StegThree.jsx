import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PrimaryButton from '../../Utilities/UI/PrimaryButton'
import DropdownList from '../../Utilities/UI/DropDownList'
import Countries from '../../Assets/Countries'
import { useDispatch, useSelector } from 'react-redux'
import { updateStepThreeData } from '../../Utilities/Redux/Slices/registrationSlice'
import DatePickerInput from '../../Utilities/UI/DatePickerInput'

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
    if (
      birthDate &&
      gender.trim().length > 0 &&
      nationality.trim().length > 0
    ) {
      setUserInfo({
        birthDate: birthDate,
        gender: gender,
        nationality: nationality,
      })
    }
  }, [birthDate, gender, nationality])

  const handleNext = () => {
    dispatch(
      updateStepThreeData({
        birthDate: userInfo.birthDate,
        gender: userInfo.gender,
        nationality: userInfo.nationality,
      })
    )
    goToNextStep()
  }

  return (
    <>
      <DatePickerInput
        label={'Birth Date'}
        value={userInfo.birthDate}
        handleChange={date =>
          setUserInfo({
            ...userInfo,
            birthDate: date,
          })
        }
      />

      <DropdownList
        label='Gender'
        placeholder='Select Gender'
        data={[
          { label: 'Male', value: 'Male' },
          { label: 'Female', value: 'Female' },
          { label: 'Other', value: 'Other' },
        ]}
        value={userInfo.gender}
        handleChange={e => setUserInfo({ ...userInfo, gender: e })}
      />

      <DropdownList
        label='Nationality'
        placeholder='Select country'
        data={Countries}
        value={userInfo.nationality}
        handleChange={e => setUserInfo({ ...userInfo, nationality: e })}
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

export default StegThree
