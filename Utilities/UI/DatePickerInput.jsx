import React, { useState } from 'react'
import { View, Platform, Pressable, StyleSheet, Text } from 'react-native'
import RNDateTimePicker from '@react-native-community/datetimepicker'

import DateFormatter from '../Helper/DateFormatter'

const DatePickerInput = ({ label, value, handleChange }) => {
 
   const styles = getStyles()

  const [show, setShow] = useState(false)

  const onChange = (event, selectedDate) => {
    if (event.type === 'set') {
      if (Platform.OS === 'android') {
        setShow(false)
      }
      handleChange('birthDate', selectedDate)
    }
  }

  const toggleMode = () => {
    setShow(!show)
  }

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      {Platform.OS === 'ios' ? (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}
        >
          <RNDateTimePicker
            style={{ marginLeft: -18 }}
            value={value}
            mode={'date'}
            onChange={onChange}
          />
        </View>
      ) : (
        <>
          <Pressable style={styles.inputBtn} onPress={toggleMode}>
            <Text style={styles.valueStyle}>
              {DateFormatter.formatDate(value)}
            </Text>
          </Pressable>
          {show && (
            <>
              <RNDateTimePicker
                value={value}
                mode={'date'}
                onChange={onChange}
              />
            </>
          )}
        </>
      )}
    </View>
  )
}

const getStyles =()=>
  StyleSheet.create({
    inputContainer: {
      marginHorizontal: 4,
      marginVertical: 8,
    },
    label: {
      fontFamily: 'Inter-SemiBold',
      fontSize: Platform.select({
        ios: 18,
        android: 12,
        web: 18,
      }),
      color: '#6B6B6B',
      marginBottom: 5,
    },
    inputBtn: {
      flex: 1,
      backgroundColor: 'gray',
      color: '#6B6B6B',
      paddingHorizontal: Platform.select({
        ios: 10,
        android: 8,
        web: 16,
      }),
      paddingVertical: Platform.select({
        ios: 14,
        android: 12,
        web: 16,
      }),
      borderRadius: 6,
      fontSize: 18,
    },
    valueStyle: {
      fontSize: 16,
      color: '#6B6B6B',
    },
    doneButton: {
      backgroundColor: 'black',
      padding: 12,
      borderRadius: 5,
    },
    doneBtnText: {
      textAlign: 'center',
      fontSize: 16,
      color: 'white',
    },
  })

export default DatePickerInput
