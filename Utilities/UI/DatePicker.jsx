import React, { useState } from 'react'
import { View, TextInput, Platform } from 'react-native'
import DatePicker from 'react-native-modern-datepicker'
import Input from './Input'

const GetDatePicker = () => {
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)
  return (
    <View>
      <DatePicker
        options={{
          backgroundColor: '#090C08',
          textHeaderColor: '#FFA25B',
          textDefaultColor: '#F6E7C1',
          selectedTextColor: '#fff',
          mainColor: '#F4722B',
          textSecondaryColor: '#D6C7A1',
          borderColor: 'rgba(122, 146, 165, 0.1)',
        }}
        current='2020-07-13'
        selected='2020-07-23'
        mode='calendar'
        minuteInterval={30}
        style={{ borderRadius: 10 }}
      />
    </View>
  )
}

export default GetDatePicker
