import { View, Text, Pressable, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import Input from '../../../Utilities/UI/Input'
import DatePicker from 'react-native-modern-datepicker'
import PrimaryButton from '../../../Utilities/UI/PrimaryButton'
import { useTheme } from '../../../Styles/theme'
import DropdownList from '../../../Utilities/UI/DropDownList'
import Countries from '../../../Assets/Countries'

const StepTwo = ({
  styles,
  goToNextStep,
  handleOnPressStartDate,
  handleChangeStartDate,
  selectedStartDate,
  openStartDatePicker,
  startedDate,
  date,
  setSelectedStartDate,
  goToPreviousStep,
}) => {
  const { theme } = useTheme()
  return (
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
            placeholder: 'set Aug 21 2002',
            editable: false,
            onChangeText: handleChangeStartDate,
            value: selectedStartDate,
            onPressIn: handleOnPressStartDate,
          }}
        />
      </Pressable>

      {/* Create modal for date picker */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={openStartDatePicker}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DatePicker
              mode='calendar'
              selected={startedDate}
              onDateChanged={handleChangeStartDate}
              onSelectedChange={date => setSelectedStartDate(date)}
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
          { label: 'Male', value: '1' },
          { label: 'Female', value: '2' },
          { label: 'Other', value: '3' },
        ]}
      />
      <DropdownList
        label='Nationality'
        placeholder='Select country'
        data={Countries}
      />
      <DropdownList
        label='Role'
        placeholder='Select Role'
        data={[
          { label: 'Activity Leader', value: '1' },
          { label: 'Board Member', value: '2' },
          { label: 'Non', value: '3' },
        ]}
      />
      <Input
        label='Phone Number'
        textInputConfig={{
          keyboardType: 'phone-pad',
          autoCorrect: false,
        }}
      />
      <Input
        label='Address'
        textInputConfig={{
          autoCorrect: false,
        }}
      />
      <Input
        label='City'
        textInputConfig={{
          autoCorrect: false,
        }}
      />
      <Input
        label='Zip Code'
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
            onPress={goToNextStep}
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

export default StepTwo
