import React, { useState } from 'react'
import { View, TextInput, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Input from './Input'

const DatePicker = () => {
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setDate(currentDate)
  }

  // Format date for display in TextInput
  const formatDate = date => {
    return ` ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }

  return (
    <View>
      <Input
        label='Birthday Date'
        textInputConfig={{
          autoCorrect: false,
          autoCapitalize: 'words',
        }}
        placeholder='Select Date'
        value={formatDate(date)}
        onFocus={() => setShow(true)} // Show the picker when the input is focused
      />
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode='date'
          is24Hour={true}
          display='default'
          onChange={onChange}
          onTouchCancel={() => setShow(false)} // Hide the picker if the user cancels the selection
        />
      )}
    </View>
  )
}

export default DatePicker
