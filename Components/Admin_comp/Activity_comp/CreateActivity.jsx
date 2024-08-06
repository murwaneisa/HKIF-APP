import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
} from 'react-native'
import React, { useRef } from 'react'
import { useTheme } from '../../../Styles/theme'
import { useState } from 'react'
import Checkbox from 'expo-checkbox'
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
  Feather,
} from '@expo/vector-icons'
import CoachSelector from './CoachSelector'
import DatePickerModal from '../../../Utilities/UI/AddSchedule'
import AddSchedule from '../../../Utilities/UI/AddSchedule'
import { Formik } from 'formik'
import * as Yup from 'yup'

// Validation Schema for Formik
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  location: Yup.string().required('Location is required'),
  description: Yup.string().required('Description is required'),
  date: Yup.date().required('Date is required').nullable(),
  startTime: Yup.date().required('Start time is required').nullable(),
  endTime: Yup.date()
    .required('End time is required')
    .nullable()
    .when('startTime', (startTime, schema) => {
      return startTime
        ? schema.min(startTime, "End time can't be before start time")
        : schema
    }),
  frequency: Yup.string().required('Frequency is required'),
  interval: Yup.number().when('frequency', {
    is: 'recurring',
    then: Yup.number()
      .min(1, 'Interval must be at least 1')
      .required('Interval is required'),
  }),
  occurrences: Yup.number().when('frequency', {
    is: 'recurring',
    then: Yup.number()
      .min(1, 'Occurrences must be at least 1')
      .required('Occurrences are required'),
  }),
})
const CreateActivity = ({ route, navigation }) => {
  const { theme } = useTheme()
  const { activityId } = route?.params || {}
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false)
  const [pickerType, setPickerType] = useState('time') // New state for picker type
  const [showInput, setShowInput] = useState(false)
  const [selectedDays, setSelectedDays] = useState({})
  const styles = getStyles(theme)

  const openDatePicker = () => {
    setPickerType('time')
    setOpenStartDatePicker(true)
  }

  const handleCloseModal = () => {
    setOpenStartDatePicker(false)
  }

  const toggleDaySelection = day => {
    setSelectedDays(prevSelectedDays => ({
      ...prevSelectedDays,
      [day]: !prevSelectedDays[day],
    }))
  }
  const inputRefs = useRef({
    titleInput: null,
    locationInput: null,
  })
  const focusInput = inputKey => {
    inputRefs.current[inputKey]?.focus()
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.backgroundSecondary }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <Formik
          initialValues={{
            title: '',
            location: '',
            description: '',
            date: null,
            startTime: null,
            endTime: null,
            frequency: 'once',
            interval: 1,
            occurrences: 1,
            timeSlots: [],
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            // Handle form submission
            console.log(values)
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <>
              {/* Title */}
              <TouchableOpacity
                style={[
                  styles.sectionContainer,
                  { backgroundColor: theme.colors.accent2 },
                ]}
                onPress={() => focusInput('titleInput')}
              >
                <View style={styles.sectionTitle}>
                  <Text style={styles.sectionText}>Title</Text>
                </View>
                <TextInput
                  ref={el => (inputRefs.current.titleInput = el)}
                  placeholderTextColor={theme.colors.text}
                  style={styles.input}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values.title}
                />
              </TouchableOpacity>
              {errors.title && touched.title && (
                <Text style={{ color: 'red' }}>{errors.title}</Text>
              )}
              {/* image */}
              <View
                style={[
                  styles.descriptionInput,
                  {
                    backgroundColor: theme.colors.accent2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 0,
                    borderColor: theme.colors.text,
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                  },
                ]}
              >
                <MaterialIcons
                  name='add-a-photo'
                  size={28}
                  color={theme.colors.text}
                />
                <Text style={[styles.sectionText, { marginTop: 8 }]}>
                  Upload event image
                </Text>
              </View>

              {/* Location */}
              <TouchableOpacity
                onPress={() => focusInput('locationInput')}
                style={[
                  styles.sectionContainer,
                  { backgroundColor: theme.colors.accent2 },
                ]}
              >
                <View style={styles.sectionTitle}>
                  <Entypo name='location' size={24} color={theme.colors.text} />
                </View>
                <TextInput
                  ref={el => (inputRefs.current.locationInput = el)}
                  placeholder='Add location'
                  placeholderTextColor={theme.colors.text}
                  style={styles.input}
                  onChangeText={handleChange('location')}
                  onBlur={handleBlur('location')}
                  value={values.location}
                />
              </TouchableOpacity>
              {errors.location && touched.location && (
                <Text style={{ color: 'red' }}>{errors.location}</Text>
              )}

              {/* Description */}
              <View style={[styles.descriptionContainer]}>
                <TouchableOpacity
                  style={[styles.descriptionTitle]}
                  onPress={() => setShowInput(true)}
                >
                  <View>
                    <Text style={styles.sectionText}>Description</Text>
                  </View>
                </TouchableOpacity>
                {showInput && (
                  <TextInput
                    style={styles.descriptionInput}
                    placeholderTextColor={theme.colors.text}
                    multiline
                    placeholder='Enter your description here...'
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values.description}
                  />
                )}
              </View>
              {errors.description && touched.description && (
                <Text style={{ color: 'red' }}>{errors.description}</Text>
              )}

              {/* Day and Time Section */}
              <View style={styles.dateTimeContainer}>
                <View
                  style={[
                    styles.sectionContainer,
                    {
                      borderBottomWidth: 1,
                      borderBottomColor: theme.colors.text,
                      paddingHorizontal: 0,
                      paddingBottom: 10,
                      marginVertical: 0,
                      marginBottom: 10,
                      borderRadius: 0,
                      shadowOpacity: 0,
                      shadowRadius: 0,
                      elevation: 0,
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name='calendar-clock'
                    size={24}
                    color={theme.colors.text}
                  />
                  <Text
                    style={[
                      styles.sectionText,
                      { marginLeft: 10, fontFamily: 'Inter-Bold' },
                    ]}
                  >
                    Activity day & time
                  </Text>
                  <Pressable onPress={openDatePicker} style={styles.addDate}>
                    <Entypo name='plus' size={24} color={theme.colors.text} />
                  </Pressable>
                </View>
              </View>

              {/* AddSchedule Modal */}
              <AddSchedule
                isOpen={openStartDatePicker}
                onClose={handleCloseModal}
                formikProps={{
                  values,
                  setFieldValue,
                  errors,
                  touched,
                }}
              />

              {/* Buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    { backgroundColor: theme.colors.primary },
                  ]}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>
                    {activityId ? 'Edit Event' : 'Create Event'}
                  </Text>
                </TouchableOpacity>
                {activityId ? (
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'red' }]}
                  >
                    <Text style={styles.buttonText}>Delete Event</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const getStyles = theme => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.backgroundSecondary,
      padding: Platform.select({
        ios: '2%',
        android: '5%',
        web: '5%',
      }),
    },
    dateTimeContainer: {
      backgroundColor: theme.colors.accent2,
      marginVertical: 10,
      borderRadius: 6,
      padding: 12,
    },
    startDate: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5,
    },
    sectionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      borderRadius: 6,
      paddingHorizontal: 12,
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    sectionTitle: {
      width: 35,
    },
    sectionText: {
      fontFamily: 'Inter-Bold',
      color: theme.colors.text,
    },
    pressable: {
      borderRadius: 6,
      backgroundColor: theme.colors.accent,
      padding: Platform.select({
        ios: 10,
        android: 6,
        web: 16,
      }),
    },
    dateField: {
      marginHorizontal: 8,
    },
    input: {
      height: 50,
      backgroundColor: theme.colors.accent2,
      width: Platform.select({
        web: ' 100%',
      }),
      color: theme.colors.text,
      padding: Platform.select({
        ios: 10,
        android: 6,
        web: 16,
      }),
      fontSize: 18,
    },
    inputText: {
      color: theme.colors.text,

      fontSize: 18,
    },
    DatePickerButton: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },
    descriptionContainer: {
      backgroundColor: theme.colors.accent2,
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginVertical: 10,
      borderRadius: 6,
      padding: 14,
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    descriptionTitle: { width: '100%' },
    descriptionInput: {
      height: Platform.select({
        ios: 200,
        android: 150,
        web: 250,
      }), // Adjust the height as needed
      width: '100%', // Adjust the width as needed
      borderColor: theme.colors.text,
      borderRadius: 8,
      borderWidth: 1,
      padding: 10,
      marginTop: 10,
      textAlignVertical: 'top', // This ensures text starts from the top
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    checkbox: {
      marginRight: 8,
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
    buttonContainer: {
      marginVertical: 10,
      justifyContent: 'space-between',
    },
    button: {
      width: '100%',
      borderRadius: 8,
      padding: 12,
      alignItems: 'center',
      marginVertical: 10,
    },
    buttonText: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: Platform.select({
        ios: 16,
        android: 15,
        web: 18,
      }),
    },

    timePickerContainer: {
      flexDirection: 'row',
      marginLeft: 10,
    },
    addDate: {
      marginLeft: 100,
    },
  })
}

export default CreateActivity
