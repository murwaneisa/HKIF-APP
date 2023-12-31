import React from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native'
import { useState } from 'react'
import { useTheme } from '../../Styles/theme'
import DatePicker from 'react-native-modern-datepicker'

const DatePickerModal = ({
  isOpen,
  onClose,
  children,
  handleChangeStartDate,
  onSelectedChange,
  pickerType,
  startedDate,
  selectedTime,
}) => {
  const { theme } = useTheme()
  const styles = getStyles(theme)
  console.log('Modal isOpen:', isOpen)
  return (
    <Modal animationType='fade' transparent={true} visible={isOpen}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {pickerType === 'date' && (
            <DatePicker
              mode='calendar'
              selected={startedDate}
              onDateChanged={handleChangeStartDate}
              onSelectedChange={onSelectedChange}
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
          )}
          {pickerType === 'time' && (
            <DatePicker
              mode='time'
              minuteInterval={3}
              onTimeChange={selectedTime}
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
          )}
          <TouchableOpacity onPress={onClose}>
            <Text style={{ color: theme.colors.primary }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
const getStyles = theme => {
  return StyleSheet.create({
    DatePickerButton: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },

    centeredView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalView: {
      margin: 5,
      backgroundColor: '#080516',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      padding: '3%',
      width: Platform.select({
        ios: '90%',
        android: '90%',
        web: '40%',
      }),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  })
}

export default DatePickerModal
