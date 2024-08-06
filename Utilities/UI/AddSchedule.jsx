import React, { useState } from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native'
import { useTheme } from '../../Styles/theme'
import DatePicker from 'react-native-modern-datepicker'
import TimePicker from '@react-native-community/datetimepicker'

const AddSchedule = ({ isOpen, onClose, formikProps }) => {
  const { theme } = useTheme()
  const styles = getStyles(theme)

  const [showStartTimePicker, setShowStartTimePicker] = useState(false)
  const [showEndTimePicker, setShowEndTimePicker] = useState(false)

  const { values, setFieldValue, errors, touched } = formikProps
  console.log('setFieldValue', values)
  // Add new time slot ensuring values are valid Date objects
  const addTimeSlot = () => {
    if (values.startTime instanceof Date && values.endTime instanceof Date) {
      setFieldValue('timeSlots', [
        ...values.timeSlots,
        { start: values.startTime, end: values.endTime },
      ])
      // Reset times after adding
      setFieldValue('startTime', null)
      setFieldValue('endTime', null)
    } else {
      console.log('Invalid time values') // Debugging line
    }
  }

  const removeTimeSlot = index => {
    const updatedTimeSlots = values.timeSlots.filter((_, i) => i !== index)
    setFieldValue('timeSlots', updatedTimeSlots)
  }

  const localTime = time => {
    return time.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <Modal animationType='fade' transparent={true} visible={isOpen}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Date Picker */}
          <DatePicker
            mode='calendar'
            onDateChange={date => setFieldValue('date', date)}
            style={styles.datePicker}
          />
          {errors.date && touched.date && (
            <Text style={styles.errorText}>{errors.date}</Text>
          )}

          {/* Time Pickers */}
          <View style={styles.timePickerRow}>
            <Text style={styles.label}>From:</Text>
            <TouchableOpacity
              onPress={() => setShowStartTimePicker(true)}
              style={styles.timeButton}
            >
              <Text style={styles.timeText}>
                {values.startTime ? localTime(values.startTime) : 'Select Time'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.label}>To:</Text>
            <TouchableOpacity
              onPress={() => setShowEndTimePicker(true)}
              style={styles.timeButton}
            >
              <Text style={styles.timeText}>
                {values.endTime ? localTime(values.endTime) : 'Select End Time'}
              </Text>
            </TouchableOpacity>
          </View>

          {showStartTimePicker && (
            <TimePicker
              value={values.startTime || new Date()}
              mode='time'
              is24Hour={true}
              display='default'
              onChange={(event, selectedTime) => {
                setShowStartTimePicker(false)
                if (selectedTime) setFieldValue('startTime', selectedTime)
              }}
            />
          )}

          {showEndTimePicker && (
            <TimePicker
              value={values.endTime || new Date()}
              mode='time'
              is24Hour={true}
              display='default'
              onChange={(event, selectedTime) => {
                setShowEndTimePicker(false)
                if (selectedTime) setFieldValue('endTime', selectedTime)
              }}
            />
          )}

          {errors.startTime && touched.startTime && (
            <Text style={styles.errorText}>{errors.startTime}</Text>
          )}
          {errors.endTime && touched.endTime && (
            <Text style={styles.errorText}>{errors.endTime}</Text>
          )}
          {/* Frequency Section */}
          <View style={styles.frequencySection}>
            <Text style={styles.label}>Frequency:</Text>
            <View style={styles.frequencyOptions}>
              <TouchableOpacity
                onPress={() => setFieldValue('frequency', 'once')}
                style={styles.frequencyOption}
              >
                <Text
                  style={
                    values.frequency === 'once'
                      ? styles.selectedOption
                      : styles.option
                  }
                >
                  Only once
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setFieldValue('frequency', 'recurring')}
                style={styles.frequencyOption}
              >
                <Text
                  style={
                    values.frequency === 'recurring'
                      ? styles.selectedOption
                      : styles.option
                  }
                >
                  Every
                </Text>
              </TouchableOpacity>
            </View>

            {values.frequency === 'recurring' && (
              <View style={styles.recurringOptions}>
                <TextInput
                  style={styles.input}
                  keyboardType='numeric'
                  value={String(values.interval)}
                  onChangeText={value =>
                    setFieldValue('interval', Number(value))
                  }
                />
                <Text style={styles.label}>weeks</Text>
                <TextInput
                  style={styles.input}
                  keyboardType='numeric'
                  value={String(values.occurrences)}
                  onChangeText={value =>
                    setFieldValue('occurrences', Number(value))
                  }
                />
                <Text style={styles.label}>occurrences</Text>
              </View>
            )}
          </View>

          {/* Add Time Slot Button */}
          <TouchableOpacity onPress={addTimeSlot} style={styles.addTimeButton}>
            <Text style={styles.addTimeText}>Add Time Slot</Text>
          </TouchableOpacity>

          {/* Time Slots List */}
          <ScrollView style={styles.scrollView}>
            <FlatList
              data={values.timeSlots}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.timeSlotItem}>
                  <Text style={styles.timeSlotText}>
                    {localTime(item.start)} - {localTime(item.end)}
                  </Text>
                  <TouchableOpacity onPress={() => removeTimeSlot(index)}>
                    <Text style={styles.removeText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </ScrollView>
          {/* Close Button */}
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default AddSchedule
const getStyles = theme => {
  return StyleSheet.create({
    centeredView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalView: {
      margin: 5,
      backgroundColor: theme.colors.backgroundPrimary,
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
    datePicker: {
      width: '100%',
      marginBottom: 2,
    },
    timePickerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginBottom: 15,
    },
    timeButton: {
      padding: 10,
      backgroundColor: theme.colors.accent2,
      borderRadius: 5,
    },
    timeText: {
      color: theme.colors.text,
    },
    label: {
      color: theme.colors.text,
      fontWeight: 'bold',
    },
    frequencySection: {
      marginBottom: 20,
    },
    frequencyOptions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
    },
    frequencyOption: {
      padding: 10,
      borderRadius: 5,
    },
    option: {
      color: theme.colors.text,
    },
    selectedOption: {
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
    recurringOptions: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    input: {
      width: 40,
      height: 40,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 5,
      textAlign: 'center',
      color: theme.colors.text,
    },
    addTimeButton: {
      backgroundColor: theme.colors.primary,
      padding: 10,
      borderRadius: 5,
      marginBottom: 20,
      alignItems: 'center',
    },
    addTimeText: {
      color: '#ffffff',
    },
    timeSlotText: {
      color: theme.colors.text,
    },
    flatList: {
      maxHeight: 100, // Constrain height for scrolling
    },
    scrollView: {
      flexGrow: 0, // Ensures the ScrollView takes minimal height when there are few items
      maxHeight: 100, // Constrain height for better usability within modal
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    timeSlotItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
    closeText: {
      fontFamily: 'Inter-Bold',
      textAlign: 'center',
      color: theme.colors.primary,
    },
  })
}
