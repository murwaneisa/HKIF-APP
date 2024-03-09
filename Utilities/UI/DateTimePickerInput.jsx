import React, { useState } from 'react'
import {
  View,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
} from 'react-native'
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker'
import { useTheme } from '../../Styles/theme'
import DateFormatter from '../Helper/DateFormatter'

const DateTimePickerInput = ({
  value,
  handleChange,
  setFieldTouched,
  fieldName,
  dateMode = true,
}) => {
  const { theme } = useTheme()
  const styles = getStyles(theme)
  const [show, setShow] = useState(false)

  const onChange = (event, selectedDate) => {
    if (
      event.type === 'set' ||
      event.type === 'dismissed' ||
      event.type === 'neutralButtonPressed '
    ) {
      if (Platform.OS === 'android') {
        setShow(false)
      }
      setFieldTouched(fieldName, true)
      handleChange(fieldName, selectedDate)
    }
  }

  const toggleMode = () => {
    console.log(show)
    setShow(!show)
  }

  return (
    <View style={styles.inputContainer}>
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
            mode={dateMode ? 'date' : 'time'}
            onChange={onChange}
            is24Hour={true}
          />
        </View>
      ) : (
        <>
          <Pressable style={styles.inputBtn} onPress={toggleMode}>
            <Text style={styles.valueStyle}>
              {dateMode
                ? DateFormatter.formatDate(value)
                : DateFormatter.formatTime(value)}
            </Text>
          </Pressable>
          {show && (
            <RNDateTimePicker
              value={value}
              mode={dateMode ? 'date' : 'time'}
              onChange={onChange}
              is24Hour={true}
            />
          )}
        </>
      )}
    </View>
  )
}

const getStyles = theme =>
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
      color: theme.colors.text,
      marginBottom: 5,
    },
    inputBtn: {
      flex: 1,
      backgroundColor: theme.colors.accent,
      color: theme.colors.text,
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
      color: theme.colors.text,
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

export default DateTimePickerInput
