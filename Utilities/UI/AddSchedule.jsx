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
  Pressable,
} from 'react-native'
import { useTheme } from '../../Styles/theme'
import DatePicker from 'react-native-modern-datepicker'
import TimePicker from '@react-native-community/datetimepicker'
import { Formik, FieldArray, Form } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import DateFormatter from '../Helper/DateFormatter'
import AntDesign from '@expo/vector-icons/AntDesign'

// Schedule validation schema
const scheduleValidationSchema = Yup.object().shape({
  date: Yup.date().required('Date is required'),
  startTime: Yup.date().required('Start time is required').nullable(),
  endTime: Yup.date()
    .required('End time is required')
    .nullable()
    .test(
      'is-after-start',
      'End time must be after start time',
      function (value) {
        const { startTime } = this.parent
        return value && startTime ? value > startTime : true
      }
    ),
  timeSlots: Yup.array().min(1, 'At least one time slot is required'), // Ensure at least one time slot is present
  frequency: Yup.string().required('Frequency is required'),
  interval: Yup.number().when('frequency', {
    is: 'recurring',
    then: schema =>
      schema
        .min(1, 'Interval must be at least 1')
        .required('Interval is required'),
    otherwise: schema => schema.nullable(), // Optional when not recurring
  }),

  occurrences: Yup.number().when('frequency', {
    is: 'recurring',
    then: schema =>
      schema
        .min(1, 'Occurrences must be at least 1')
        .required('Occurrences are required')
        .test(
          'is-at-least-twice-interval',
          'Occurrences must be at least twice weeks value.',
          function (value) {
            const { interval } = this.parent
            // Check if occurrences are at least twice the interval
            return value >= 2 * interval
          }
        ),
    otherwise: schema => schema.nullable(), // Optional when not recurring
  }),
})

const AddSchedule = ({ isOpen, onClose, formikProps, addSchedule }) => {
  const { theme } = useTheme()
  const styles = getStyles(theme)

  const [showStartTimePicker, setShowStartTimePicker] = useState(false)
  const [showEndTimePicker, setShowEndTimePicker] = useState(false)

  const initialScheduleValues = {
    date: null,
    startTime: null,
    endTime: null,
    timeSlots: [],
    frequency: 'once',
    interval: 1,
    occurrences: 2,
  }

  return (
    <Modal animationType='fade' transparent={true} visible={isOpen}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Formik
            initialValues={initialScheduleValues}
            validationSchema={scheduleValidationSchema}
            onSubmit={(values, { resetForm }) => {
              console.log(JSON.stringify(values, null, 2))
              delete values.startTime
              delete values.endTime
              formikProps.values.schedule.push(values)
              resetForm()
              /*  onClose() */
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              setErrors,
              setTouched,
              values,
              errors,
              touched,
              isValid,
              dirty,
            }) => (
              <>
                {/* Date Picker */}
                <DatePicker
                  mode='calendar'
                  selected={values.date || new Date()}
                  onDateChange={date => {
                    const parsedDate = new Date(date.replace(/\//g, '-'))
                    if (!isNaN(parsedDate.getTime())) {
                      setFieldValue('date', parsedDate)
                    }
                  }}
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
                      {values.startTime
                        ? DateFormatter.formatTime(values.startTime)
                        : 'Select Time'}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.label}>To:</Text>
                  <TouchableOpacity
                    onPress={() => setShowEndTimePicker(true)}
                    style={styles.timeButton}
                  >
                    <Text style={styles.timeText}>
                      {values.endTime
                        ? DateFormatter.formatTime(values.endTime)
                        : 'Select Time'}
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
                      setFieldValue('startTime', selectedTime)
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
                      setFieldValue('endTime', selectedTime)
                    }}
                  />
                )}

                {errors.startTime && touched.startTime && (
                  <Text style={styles.errorText}>{errors.startTime}</Text>
                )}
                {errors.endTime && touched.endTime && (
                  <Text style={styles.errorText}>{errors.endTime}</Text>
                )}
                {errors.timeSlots && touched.timeSlots && (
                  <Text style={styles.errorText}>{errors.timeSlots}</Text>
                )}

                {/* Time Slots List */}
                <FieldArray name='timeSlots'>
                  {({ push, remove }) => (
                    <>
                      <FlatList
                        data={values.timeSlots}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                          <View style={styles.timeSlotItem}>
                            <Text style={styles.timeSlotText}>
                              {DateFormatter.formatTime(item.start)} -{' '}
                              {DateFormatter.formatTime(item.end)}
                            </Text>
                            <TouchableOpacity onPress={() => remove(index)}>
                              {/*   <Text style={styles.removeText}>Remove</Text> */}
                              <AntDesign
                                name='delete'
                                size={20}
                                color={theme.colors.error}
                              />
                            </TouchableOpacity>
                          </View>
                        )}
                        style={styles.flatList} // Ensure the FlatList is styled correctly for scrolling
                      />
                      <Pressable
                        onPress={() => {
                          // Perform validation before adding the time slot
                          if (!values.startTime || !values.endTime) {
                            setErrors({
                              ...errors,
                              startTime: !values.startTime
                                ? 'Start time is required'
                                : undefined,
                              endTime: !values.endTime
                                ? 'End time is required'
                                : undefined,
                            })
                            setTouched({
                              ...touched,
                              startTime: true,
                              endTime: true,
                            })
                            return
                          }

                          if (values.endTime <= values.startTime) {
                            setErrors({
                              ...errors,
                              endTime: 'End time must be after start time',
                            })
                            setTouched({
                              ...touched,
                              endTime: true,
                            })
                            return
                          }

                          // Add the time slot if valid
                          push({
                            start: values.startTime,
                            end: values.endTime,
                          })
                          setFieldValue('startTime', null)
                          setFieldValue('endTime', null)
                        }}
                        style={styles.addTimeButton}
                      >
                        <Text style={styles.buttonText}>Add Time Slot</Text>
                      </Pressable>
                    </>
                  )}
                </FieldArray>

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
                {errors.interval && touched.interval && (
                  <Text style={styles.errorText}>{errors.interval}</Text>
                )}
                {errors.occurrences && touched.occurrences && (
                  <Text style={styles.errorText}>{errors.occurrences}</Text>
                )}

                <View style={styles.buttonContainer}>
                  {/* Save Button */}
                  <Pressable
                    onPress={() => {
                      if (!values.date) {
                        setErrors({
                          ...errors,
                          date: 'Date is required',
                        })
                        setTouched({
                          ...touched,
                          date: true,
                        })
                        return
                      }
                      if (values.timeSlots.length === 0) {
                        setErrors({
                          ...errors,
                          timeSlots: 'At least one time slot is required',
                        })
                        setTouched({
                          ...touched,
                          timeSlots: true,
                        })
                        return
                      }

                      handleSubmit()
                    }}
                    style={styles.saveButton}
                  >
                    <Text style={styles.buttonText}>Save</Text>
                  </Pressable>

                  {/* Close Button */}
                  <Pressable onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.buttonText}>Close</Text>
                  </Pressable>
                </View>
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

    timeSlotText: {
      color: theme.colors.text,
    },
    removeText: {
      color: theme.colors.error,
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
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    errorText: {
      color: theme.colors.error,
      textAlign: 'center',
    },

    closeButton: {
      backgroundColor: theme.colors.error,
      padding: 10,
      borderRadius: 5,
      marginBottom: 1,
      fontFamily: 'Inter-Bold',
      color: '#FFFFFF',
    },
    saveButton: {
      backgroundColor: theme.colors.primary,
      padding: 10,
      borderRadius: 5,
      marginBottom: 1,
      textAlign: 'center',
      color: '#FFFFFF',
    },
    buttonText: {
      fontFamily: 'Inter-Bold',
      color: '#FFFFFF',
    },
  })
}
