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
import React, { useRef, useState, useEffect } from 'react'
import { useTheme } from '../../../Styles/theme'
import DatePickerModal from '../../../Utilities/UI/AddSchedule'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import Checkbox from 'expo-checkbox'
import { MaterialIcons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import {
  createNewEvent,
  deleteExistingEvent,
  fetchEventById,
  updateExistingEvent,
} from '../../../Utilities/Redux/Actions/eventActions'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { Formik } from 'formik'
import DateFormatter from '../../../Utilities/Helper/DateFormatter'
import DateTimePickerInput from '../../../Utilities/UI/DateTimePickerInput'

const AddEvent = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const { theme } = useTheme()
  const styles = getStyles(theme)
  const { eventId } = route.params || {}
  const [showInput, setShowInput] = useState(false)
  // const [pickerType, setPickerType] = useState('date')
  // const [openStartDatePicker, setOpenStartDatePicker] = useState(false)

  const eventInfo = eventId
    ? useSelector(state => state.event.currentEvent)
    : undefined
  const isLoading = useSelector(state => state.event.loading)

  const benefitOptions = [
    { label: 'Food', value: 'FOOD' },
    { label: 'Drinks', value: 'DRINK' },
    { label: 'Games', value: 'GAMES' },
  ]

  // const openDatePicker = () => {
  //   setPickerType('date')
  //   setOpenStartDatePicker(true)
  // }

  // const handleCloseModal = () => {
  //   setOpenStartDatePicker(false)
  // }

  const inputRefs = useRef({
    titleInput: null,
    locationInput: null,
    priceInput: null,
  })

  const focusInput = inputKey => {
    inputRefs.current[inputKey]?.focus()
  }

  function combineDateTime(date, time) {
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const hours = time.getHours()
    const minutes = time.getMinutes()
    const localDateTime = new Date(year, month, day, hours, minutes)
    return localDateTime.toISOString() // Convert to ISO string and keep the 'Z' to denote UTC
  }
  const handleDeleteEvent = () => {
    // Confirmation dialog before deleting (optional)
    if (window.confirm('Are you sure you want to delete this event?')) {
      dispatch(deleteExistingEvent(eventId))
    }
    navigation.goBack()
  }

  useEffect(() => {
    if (eventId) {
      dispatch(fetchEventById(eventId))
    }
  }, [dispatch, eventId])

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string(),
    imageUrl: Yup.string().url('Must be a valid URL'),
    price: Yup.number()
      .required('Price is required')
      .positive('Price must be positive')
      .integer(),
    startDate: Yup.date()
      .required('Start date is required')
      .max(Yup.ref('endDate'), 'Start date must be before end date'),
    startTime: Yup.date()
      .required('Start time is required')
      .when('startDate', (startDate, schema) =>
        schema.test(
          'is-same-or-after-current-time',
          'Start time must be later than the current time',
          startTime => startTime >= new Date()
        )
      ),
    endDate: Yup.date()
      .required('End date is required')
      .min(Yup.ref('startDate'), 'End date must be after start date'),
    endTime: Yup.date()
      .required('End time is required')
      .test(
        'is-after-start',
        'End time must be after start time',
        function (value) {
          const { startDate, startTime } = this.parent
          const startDateTime = combineDateTime(startDate, startTime)
          const endDateTime = combineDateTime(this.parent.endDate, value)
          return endDateTime > startDateTime
        }
      ),
    attendeesIds: Yup.array().of(Yup.string()),
    benefits: Yup.array()
      .of(Yup.string().oneOf(['GAMES', 'FOOD', 'DRINK'], 'Invalid benefit'))
      .required('At least one benefit is required'),
    address: Yup.string().required('Address is required'),
  })

  return isLoading ? (
    <View>
      <Text>Loading...</Text>
    </View>
  ) : (
    <Formik
      initialValues={{
        title: eventInfo?.title || '',
        description: eventInfo?.description || '',
        imageUrl:
          eventInfo?.imageUrl ||
          'https://plus.unsplash.com/premium_photo-1709311417346-0497456aef0e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: eventInfo?.price || '',
        startDate: eventInfo?.startTime
          ? new Date(eventInfo.startTime)
          : new Date(),
        startTime: eventInfo?.startTime
          ? new Date(eventInfo.startTime)
          : new Date(),
        endDate: eventInfo?.endTime ? new Date(eventInfo.endTime) : new Date(),
        endTime: eventInfo?.endTime ? new Date(eventInfo.endTime) : new Date(),
        attendeesIds: eventInfo?.attendeesIds || [],
        benefits: eventInfo?.benefits || [],
        address: eventInfo?.address || '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const combinedStartTime = combineDateTime(
          values.startDate,
          values.startTime
        )
        const combinedEndTime = combineDateTime(values.endDate, values.endTime)
        delete values.startDate
        delete values.startTime
        delete values.endDate
        delete values.endTime

        const submissionValues = {
          ...values,
          startTime: combinedStartTime,
          endTime: combinedEndTime,
        }

        console.log(submissionValues)
        if (eventId) {
          dispatch(updateExistingEvent(eventId, submissionValues))
        } else {
          dispatch(createNewEvent(submissionValues))
        }
        setSubmitting(false)
        navigation.goBack()
      }}
    >
      {({
        handleChange,
        handleBlur,
        setFieldTouched,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: theme.colors.backgroundSecondary }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
          >
            {/* <Text>{JSON.stringify(errors)}</Text>
            <Text>{JSON.stringify(touched)}</Text> */}
            {/* title */}
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
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
                placeholder='Event Title'
                style={styles.input}
              />
              {touched.title && errors.title && (
                <Text style={styles.errorText}>{errors.title}</Text>
              )}
            </TouchableOpacity>
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
            {/* date and time */}
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
                  Event date & time
                </Text>
              </View>
              <View style={styles.startDate}>
                <View style={styles.sectionTitle}>
                  <Text
                    style={[
                      styles.sectionText,
                      { fontFamily: 'Inter-SemiBold' },
                    ]}
                  >
                    Starts
                  </Text>
                </View>
                {/* Start Date */}
                <View style={[styles.dateField]}>
                  {Platform.OS === 'web' ? (
                    <TextInput
                      autoCorrect={false}
                      autoCapitalize='words'
                      placeholder='2002-08-21'
                      onChangeText={handleChange('startDate')}
                      onBlur={handleBlur('startDate')}
                      value={values.startDate}
                      placeholderTextColor={theme.colors.primary}
                      style={[
                        styles.input,
                        { backgroundColor: theme.colors.accent },
                      ]}
                    />
                  ) : (
                    // <Pressable
                    //   onPress={
                    //     Platform.select === 'web' ? undefined : openDatePicker
                    //   }
                    //   style={styles.pressable}
                    // >
                    //   <Text style={styles.inputText}>{values.startDate}</Text>
                    // </Pressable>
                    <DateTimePickerInput
                      value={values.startDate}
                      fieldName={'startDate'}
                      handleChange={setFieldValue}
                      setFieldTouched={setFieldTouched}
                    />
                  )}
                </View>
                {(touched.startDate || touched.startTime) &&
                  errors.startDate && (
                    <Text style={styles.errorText}>{errors.startDate}</Text>
                  )}
                {/* Start Time */}
                <View style={styles.dateField}>
                  {Platform.OS === 'web' ? (
                    <TextInput
                      autoCorrect={false}
                      autoCapitalize='words'
                      placeholder='10:00'
                      onChangeText={handleChange('startTime')}
                      value={values.startTime}
                      onBlur={handleBlur('startTime')}
                      placeholderTextColor={theme.colors.primary}
                      style={[
                        styles.input,
                        { backgroundColor: theme.colors.accent },
                      ]}
                    />
                  ) : (
                    <DateTimePickerInput
                      value={values.startTime}
                      fieldName={'startTime'}
                      handleChange={setFieldValue}
                      dateMode={false}
                      setFieldTouched={setFieldTouched}
                    />
                  )}
                </View>
                {(touched.startDate || touched.startTime) &&
                  errors.startTime && (
                    <Text style={styles.errorText}>{errors.startTime}</Text>
                  )}
              </View>
              <View style={styles.startDate}>
                <View style={styles.sectionTitle}>
                  <Text
                    style={[
                      styles.sectionText,
                      { fontFamily: 'Inter-SemiBold' },
                    ]}
                  >
                    Ends
                  </Text>
                </View>
                {/* End Date */}
                <View style={styles.dateField}>
                  {Platform.OS === 'web' ? (
                    <TextInput
                      autoCorrect={false}
                      autoCapitalize='words'
                      placeholder='2002-08-21'
                      onChangeText={handleChange('endDate')}
                      onBlur={handleBlur('endDate')}
                      value={values.endDate}
                      placeholderTextColor={theme.colors.primary}
                      style={[
                        styles.input,
                        { backgroundColor: theme.colors.accent },
                      ]}
                    />
                  ) : (
                    <DateTimePickerInput
                      value={values.endDate}
                      fieldName={'endDate'}
                      handleChange={setFieldValue}
                      setFieldTouched={setFieldTouched}
                    />
                  )}
                </View>
                {(touched.endDate || touched.endTime) && errors.endDate && (
                  <Text style={styles.errorText}>{errors.endDate}</Text>
                )}
                {/* End Time */}
                <View style={styles.dateField}>
                  {Platform.OS === 'web' ? (
                    <TextInput
                      autoCorrect={false}
                      autoCapitalize='words'
                      placeholder='10:00'
                      onChangeText={handleChange('endTime')}
                      onBlur={handleBlur('endTime')}
                      value={values.endTime}
                      placeholderTextColor={theme.colors.primary}
                      style={[
                        styles.input,
                        { backgroundColor: theme.colors.accent },
                      ]}
                    />
                  ) : (
                    <DateTimePickerInput
                      value={values.endTime}
                      fieldName={'endTime'}
                      handleChange={setFieldValue}
                      dateMode={false}
                      setFieldTouched={setFieldTouched}
                    />
                  )}
                </View>
                {(touched.endDate || touched.endTime) && errors.endTime && (
                  <Text style={styles.errorText}>{errors.endTime}</Text>
                )}
              </View>
            </View>
            {/* address */}
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
                onChangeText={handleChange('address')}
                ref={el => (inputRefs.current.locationInput = el)}
                onBlur={handleBlur('address')}
                value={values.address}
                placeholder='Add address'
                placeholderTextColor={theme.colors.text}
                style={styles.input}
              />
              {touched.address && errors.address && (
                <Text style={styles.errorText}>{errors.address}</Text>
              )}
            </TouchableOpacity>
            {/* Price */}
            <TouchableOpacity
              onPress={() => focusInput('priceInput')}
              style={[
                styles.sectionContainer,
                { backgroundColor: theme.colors.accent2 },
              ]}
            >
              <View style={styles.sectionTitle}>
                <FontAwesome5
                  name='dollar-sign'
                  size={24}
                  color={theme.colors.text}
                />
              </View>
              <TextInput
                onChangeText={handleChange('price')}
                ref={el => (inputRefs.current.priceInput = el)}
                onBlur={handleBlur('price')}
                value={values.price.toString()}
                placeholder='Add price in SEK'
                placeholderTextColor={theme.colors.text}
                style={styles.input}
              />
              {touched.price && errors.price && (
                <Text style={styles.errorText}>{errors.price}</Text>
              )}
            </TouchableOpacity>
            {/* description */}
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
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                  placeholder='Enter your description here...'
                />
              )}
            </View>
            {/* includes */}
            <View style={[styles.descriptionContainer]}>
              <TouchableOpacity
                style={[styles.descriptionTitle]}
                onPress={() => setShowInput(true)}
              >
                <View>
                  <Text style={styles.sectionText}>Includes</Text>
                </View>
              </TouchableOpacity>
              {benefitOptions.map(option => (
                <View key={option.value} style={styles.checkboxContainer}>
                  <Checkbox
                    style={styles.checkbox}
                    value={values.benefits.includes(option.value)}
                    onValueChange={isChecked => {
                      // If the checkbox is checked, add the benefit to the array
                      if (isChecked) {
                        setFieldValue('benefits', [
                          ...values.benefits,
                          option.value,
                        ])
                      } else {
                        // If the checkbox is unchecked, remove the benefit from the array
                        setFieldValue(
                          'benefits',
                          values.benefits.filter(
                            benefit => benefit !== option.value
                          )
                        )
                      }
                    }}
                    color={
                      values.benefits.includes(option.value)
                        ? theme.colors.primary
                        : undefined
                    }
                  />
                  <Text
                    style={[
                      styles.sectionText,
                      { fontFamily: 'Inter-SemiBold' },
                    ]}
                  >
                    {option.label}
                  </Text>
                </View>
              ))}
            </View>

            {/*buttons  */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleSubmit}
                style={[
                  styles.button,
                  { backgroundColor: theme.colors.primary },
                ]}
              >
                <Text style={styles.buttonText}>
                  {eventId ? 'Edit Event' : 'Create Event'}
                </Text>
              </TouchableOpacity>
              {eventId ? (
                <TouchableOpacity
                  onPress={handleDeleteEvent}
                  style={[styles.button, { backgroundColor: 'red' }]}
                >
                  <Text style={styles.buttonText}>Delete Event</Text>
                </TouchableOpacity>
              ) : null}
            </View>

            {/* model */}
            {/* <DatePickerModal
              // startedDate={startedDate}
              isOpen={openStartDatePicker}
              onClose={handleCloseModal}
              // handleChangeStartDate={handleChangeStartDate}
              // onSelectedChange={date => setSelectedStartDate(date)}
              // selectedTime={selectedTime => setTime(selectedTime)}
              pickerType={pickerType}
            ></DatePickerModal> */}
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  )
}

const getStyles = theme => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.backgroundSecondary,
      paddingHorizontal: Platform.select({
        ios: '5%',
        android: '5%',
        web: '10%',
      }),
      paddingVertical: Platform.select({
        ios: '2%',
        android: '2%',
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
    },
    sectionTitle: {
      width: 50,
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
      padding: 12,
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
  })
}

export default AddEvent
