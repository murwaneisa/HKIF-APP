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
import { Formik, FieldArray } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'

// Schedule validation schema
const scheduleValidationSchema = Yup.object().shape({
  date: Yup.date().required('Date is required').nullable(),
  timeSlots: Yup.array()
    .of(
      Yup.object().shape({
        start: Yup.date().required('Start time is required').nullable(),
        end: Yup.date()
          .required('End time is required')
          .nullable()
          .when('start', (start, schema) => {
            return start
              ? schema.min(start, "End time can't be before start time")
              : schema
          }),
      })
    )
    .min(1, 'At least one time slot is required'), // Ensure at least one time slot is present
  frequency: Yup.string().required('Frequency is required'),
  interval: Yup.number()
    .when('frequency', {
      is: 'recurring',
      then: Yup.number()
        .min(1, 'Interval must be at least 1')
        .required('Interval is required'),
    })
    .nullable(),
  occurrences: Yup.number()
    .when('frequency', {
      is: 'recurring',
      then: Yup.number()
        .min(1, 'Occurrences must be at least 1')
        .required('Occurrences are required'),
    })
    .nullable(),
})

const AddSchedule = ({ isOpen, onClose, formikProps }) => {
  const { theme } = useTheme()
  const styles = getStyles(theme)

  const [showStartTimePicker, setShowStartTimePicker] = useState(false)
  const [showEndTimePicker, setShowEndTimePicker] = useState(false)

  const initialScheduleValues = {
    date: null,
    timeSlots: [],
    frequency: 'once',
    interval: 1,
    occurrences: 1,
  }

  const handleTimeChange = (fieldName, selectedTime, scheduleFormik) => {
    if (selectedTime) {
      const updatedTime = new Date()
      updatedTime.setHours(selectedTime.getHours())
      updatedTime.setMinutes(selectedTime.getMinutes())
      updatedTime.setSeconds(0)
      updatedTime.setMilliseconds(0)
      scheduleFormik.setFieldValue(fieldName, updatedTime)
    }
  }
  console.log(initialScheduleValues)
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
          <Formik
            initialValues={initialScheduleValues}
            validationSchema={scheduleValidationSchema}
            onSubmit={(scheduleValues, { resetForm }) => {
              if (!scheduleFormik.isValid) {
                console.log('Form is invalid:', scheduleFormik.errors)
                return // Exit early if the form is not valid
              }
              // Add the validated schedule to parent
              //addSchedule(scheduleValues)
              //resetForm() // Reset form to initial values after submission
              onClose()
            }}
          >
            {scheduleFormik => (
              <>
                {/* Date Picker */}
                <DatePicker
                  mode='calendar'
                  selected={scheduleFormik.values.date || new Date()}
                  onDateChange={date => {
                    // Use Date constructor to parse the date
                    const parsedDate = new Date(date.replace(/\//g, '-')) // Replace slashes with dashes for consistency
                    if (!isNaN(parsedDate.getTime())) {
                      console.log('Parsed date:', parsedDate)
                      scheduleFormik.setFieldValue('date', parsedDate)
                    }
                  }}
                  style={styles.datePicker}
                />
                {scheduleFormik.errors.date && scheduleFormik.touched.date && (
                  <Text style={styles.errorText}>
                    {scheduleFormik.errors.date}
                  </Text>
                )}

                {/* Time Pickers */}
                <View style={styles.timePickerRow}>
                  <Text style={styles.label}>From:</Text>
                  <TouchableOpacity
                    onPress={() => setShowStartTimePicker(true)}
                    style={styles.timeButton}
                  >
                    <Text style={styles.timeText}>
                      {scheduleFormik.values.startTime
                        ? localTime(scheduleFormik.values.startTime)
                        : 'Select Time'}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.label}>To:</Text>
                  <TouchableOpacity
                    onPress={() => setShowEndTimePicker(true)}
                    style={styles.timeButton}
                  >
                    <Text style={styles.timeText}>
                      {scheduleFormik.values.endTime
                        ? localTime(scheduleFormik.values.endTime)
                        : 'Select Time'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {showStartTimePicker && (
                  <TimePicker
                    value={scheduleFormik.values.startTime || new Date()}
                    mode='time'
                    is24Hour={true}
                    display='default'
                    onChange={(event, selectedTime) => {
                      setShowStartTimePicker(false)
                      handleTimeChange(
                        'startTime',
                        selectedTime,
                        scheduleFormik
                      )
                    }}
                  />
                )}

                {showEndTimePicker && (
                  <TimePicker
                    value={scheduleFormik.values.endTime || new Date()}
                    mode='time'
                    is24Hour={true}
                    display='default'
                    onChange={(event, selectedTime) => {
                      setShowEndTimePicker(false)
                      handleTimeChange('endTime', selectedTime, scheduleFormik)
                    }}
                  />
                )}

                {scheduleFormik.errors.startTime &&
                  scheduleFormik.touched.startTime && (
                    <Text style={styles.errorText}>
                      {scheduleFormik.errors.start}
                    </Text>
                  )}
                {scheduleFormik.errors.endTime &&
                  scheduleFormik.touched.endTime && (
                    <Text style={styles.errorText}>
                      {scheduleFormik.errors.end}
                    </Text>
                  )}

                {/* Time Slots List */}
                <FieldArray name='timeSlots'>
                  {({ push, remove }) => (
                    <>
                      <FlatList
                        data={scheduleFormik.values.timeSlots}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                          <View style={styles.timeSlotItem}>
                            <Text style={styles.timeSlotText}>
                              {localTime(item.start)} - {localTime(item.end)}
                            </Text>
                            <TouchableOpacity onPress={() => remove(index)}>
                              <Text style={styles.removeText}>Remove</Text>
                            </TouchableOpacity>
                          </View>
                        )}
                        style={styles.flatList} // Ensure the FlatList is styled correctly for scrolling
                      />
                      <TouchableOpacity
                        onPress={() => {
                          if (
                            scheduleFormik.values.startTime &&
                            scheduleFormik.values.endTime
                          ) {
                            push({
                              start: scheduleFormik.values.startTime,
                              end: scheduleFormik.values.endTime,
                            })
                            scheduleFormik.setFieldValue('startTime', null)
                            scheduleFormik.setFieldValue('endTime', null)
                          }
                        }}
                        style={styles.addTimeButton}
                      >
                        <Text style={styles.addTimeText}>Add Time Slot</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </FieldArray>

                {/* Frequency Section */}
                <View style={styles.frequencySection}>
                  <Text style={styles.label}>Frequency:</Text>
                  <View style={styles.frequencyOptions}>
                    <TouchableOpacity
                      onPress={() =>
                        scheduleFormik.setFieldValue('frequency', 'once')
                      }
                      style={styles.frequencyOption}
                    >
                      <Text
                        style={
                          scheduleFormik.values.frequency === 'once'
                            ? styles.selectedOption
                            : styles.option
                        }
                      >
                        Only once
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        scheduleFormik.setFieldValue('frequency', 'recurring')
                      }
                      style={styles.frequencyOption}
                    >
                      <Text
                        style={
                          scheduleFormik.values.frequency === 'recurring'
                            ? styles.selectedOption
                            : styles.option
                        }
                      >
                        Every
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {scheduleFormik.values.frequency === 'recurring' && (
                    <View style={styles.recurringOptions}>
                      <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        value={String(scheduleFormik.values.interval)}
                        onChangeText={value =>
                          scheduleFormik.setFieldValue(
                            'interval',
                            Number(value)
                          )
                        }
                      />
                      <Text style={styles.label}>weeks</Text>
                      <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        value={String(scheduleFormik.values.occurrences)}
                        onChangeText={value =>
                          scheduleFormik.setFieldValue(
                            'occurrences',
                            Number(value)
                          )
                        }
                      />
                      <Text style={styles.label}>occurrences</Text>
                    </View>
                  )}
                </View>

                {/* Save Button */}
                <TouchableOpacity
                  onPress={scheduleFormik.handleSubmit}
                  style={styles.saveButton}
                >
                  <Text style={styles.saveText}>Save Schedule</Text>
                </TouchableOpacity>

                {/* Close Button */}
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
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
