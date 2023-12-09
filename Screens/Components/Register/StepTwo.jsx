import {
  View,
  Text,
  Pressable,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import React from 'react'
import Input from '../../../Utilities/UI/Input'
import DatePicker from 'react-native-modern-datepicker'
import PrimaryButton from '../../../Utilities/UI/PrimaryButton'
import { useTheme } from '../../../Styles/theme'
import DropdownList from '../../../Utilities/UI/DropDownList'
import { useState, useEffect } from 'react'
import { fetchCountryData } from '../../../Utilities/Axios/country'

const StepTwo = ({
  styles,
  goToNextStep,
  goToPreviousStep,
  values,
  errors,
  touched,
  setFieldValue,
  handleChange,
  handleBlur,
  openStartDatePicker,
  setOpenStartDatePicker,
  initialValues,
}) => {
  const { theme } = useTheme()
  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker)
  }
  const [show, setShow] = useState(false)
  const [countryData, setCountryData] = useState([])
  const [countryNames, setCountryNames] = useState([])
  useEffect(() => {
    const loadCountryData = async () => {
      const data = await fetchCountryData()
      const countries = data.map(country => ({
        label: country.label,
        value: country.label,
      }))
      countries.sort((a, b) => a.label.localeCompare(b.label))
      setCountryData(data)
      setCountryNames(countries)
    }
    loadCountryData()
  }, [])
  return (
    <TouchableWithoutFeedback onPress={() => setShow(false)}>
      <>
        <Text style={[styles.headerText, styles.headerSubText]}>
          <Text> Please fill out the requested information </Text>
        </Text>
        <Pressable onPress={handleOnPressStartDate}>
          <Input
            label='Birthday Date'
            textInputConfig={{
              autoCorrect: false,
              autoCapitalize: 'words',
              placeholder: 'set Birthday Date',
              editable: false,
              value: values.startedDate,
              onPressIn: handleOnPressStartDate,
            }}
            error={
              values.startedDate !== initialValues.startedDate &&
              errors.startedDate
            }
          />
        </Pressable>
        <Modal
          animationType='slide'
          transparent={true}
          visible={openStartDatePicker}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DatePicker
                mode='calendar'
                selected={values.startedDate}
                onSelectedChange={date => {
                  if (date !== values.selectedStartDate) {
                    setFieldValue('selectedStartDate', date)
                    setFieldValue('startedDate', date)
                  }
                }}
                options={{
                  backgroundColor: '#080516',
                  textHeaderColor: theme.colors.primary,
                  textDefaultColor: '#FFFFFF',
                  selectedTextColor: '#FFF',
                  mainColor: theme.colors.primary,
                  textSecondaryColor: '#FFFFFF',
                  borderColor: 'rgba(122, 146, 165, 0.1)',
                }}
              />

              <TouchableOpacity onPress={handleOnPressStartDate}>
                <Text style={{ color: theme.colors.primary }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <DropdownList
          label='Gender'
          placeholder='Select Gender'
          data={[
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
            { label: 'Other', value: 'Other' },
          ]}
          selectedValue={values.gender}
          onValueChange={itemValue => setFieldValue('gender', itemValue.value)}
          error={values.gender !== initialValues.gender && errors.gender}
        />
        <DropdownList
          label='Nationality'
          placeholder='Select country'
          data={countryNames}
          selectedValue={values.nationality}
          onValueChange={itemValue => {
            setFieldValue('nationality', itemValue.label)
          }}
          error={
            values.nationality !== initialValues.nationality &&
            errors.nationality
          }
        />
        <DropdownList
          label='Role'
          placeholder='Select Role'
          data={[
            { label: 'Activity Leader', value: 'ACTIVITY_LEADER' },
            { label: 'Board Member', value: 'BOARD_MEMBER' },
            { label: 'None', value: 'NONE' },
          ]}
          selectedValue={values.role}
          onValueChange={itemValue => setFieldValue('role', itemValue.value)}
          error={values.role !== initialValues.role && errors.role}
        />

        <Input
          label='Phone Number'
          textInputConfig={{
            keyboardType: 'phone-pad',
            autoCorrect: false,
            onChangeText: handleChange('phoneNumber'),
            value: values.phoneNumber,
          }}
          error={
            values.phoneNumber !== initialValues.phoneNumber &&
            errors.phoneNumber
          }
          countryCode={values.countryCode}
          data={countryData}
          onValueChange={itemValue => setFieldValue('countryCode', itemValue)}
        />
        <Input
          label='Address'
          textInputConfig={{
            autoCorrect: false,
            onChangeText: handleChange('address'),
            value: values.address,
          }}
          error={values.address !== initialValues.address && errors.address}
        />
        <Input
          label='City'
          textInputConfig={{
            autoCorrect: false,
            onChangeText: handleChange('city'),
            value: values.city,
          }}
          error={values.city !== initialValues.city && errors.city}
        />
        <Input
          label='Zip Code'
          textInputConfig={{
            keyboardType: 'phone-pad',
            autoCorrect: false,
            onChangeText: handleChange('zipCode'),
            value: values.zipCode,
          }}
          error={values.zipCode !== initialValues.zipCode && errors.zipCode}
        />
        <View style={[styles.buttonsContainer]}>
          <View style={styles.buttonWrapper}>
            <PrimaryButton
              style={{ marginBottom: 10, width: '100%' }}
              paddingVertical={40}
              paddingHorizontal={12}
              onPress={goToNextStep}
              disabled={
                values.selectedStartDate === initialValues.selectedStartDate ||
                values.gender === initialValues.gender ||
                values.nationality === initialValues.nationality ||
                values.role === initialValues.role ||
                values.phoneNumber === initialValues.phoneNumber ||
                values.address === initialValues.address ||
                values.city === initialValues.city ||
                values.zipCode === initialValues.zipCode ||
                Boolean(errors.selectedStartDate) ||
                Boolean(errors.gender) ||
                Boolean(errors.nationality) ||
                Boolean(errors.role) ||
                Boolean(errors.phoneNumber) ||
                Boolean(errors.address) ||
                Boolean(errors.city) ||
                Boolean(errors.zipCode)
              }
            >
              Submit
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
    </TouchableWithoutFeedback>
  )
}

export default StepTwo
