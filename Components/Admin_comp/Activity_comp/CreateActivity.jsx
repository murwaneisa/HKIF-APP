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
import DatePickerModal from '../../../Utilities/UI/Model'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import Checkbox from 'expo-checkbox'
import { MaterialIcons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'

const CreateActivity = ({ route, navigation }) => {
  const { theme } = useTheme()
  const { activityId } = route?.params || {}
  console.log(activityId)
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false)
  const [pickerType, setPickerType] = useState('date') // New state for picker type
  const [startedDate, setStartedDate] = useState('12/12/2023')
  const [selectedStartDate, setSelectedStartDate] = useState('')
  const [time, setTime] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [showCheck, setCheck] = useState(true)
  const [isChecked, setChecked] = useState(false)
  const styles = getStyles(theme)
  const [selectedDays, setSelectedDays] = useState({})
  const weekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]

  const openDatePicker = () => {
    setPickerType('date')
    setOpenStartDatePicker(true)
  }

  const handleCloseModal = () => {
    setOpenStartDatePicker(false)
  }
  function handleChangeStartDate(propDate) {
    setStartedDate(propDate)
  }

  const inputRefs = useRef({
    titleInput: null,
    locationInput: null,
    priceInput: null,
  })
  const focusInput = inputKey => {
    inputRefs.current[inputKey]?.focus()
  }
  // Function to toggle day selection
  const toggleDaySelection = day => {
    setSelectedDays(prevSelectedDays => ({
      ...prevSelectedDays,
      [day]: !prevSelectedDays[day],
    }))
  }

  // Function to handle start time selection
  const handleStartTimeChange = (day, time) => {
    // Logic to update start time for a specific day
  }

  // Function to handle end time selection
  const handleEndTimeChange = (day, time) => {
    // Logic to update end time for a specific day
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
            placeholderTextColor={theme.colors.text}
            style={styles.input}
          />
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
        {/* location */}
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
          />
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
            ref={el => (inputRefs.current.priceInput = el)}
            placeholder='Add price kr'
            placeholderTextColor={theme.colors.text}
            style={styles.input}
          />
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
              placeholder='Enter your description here...'
            />
          )}
        </View>
        {/* day and time section */}
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
              Activity day & time
            </Text>
          </View>
          {/* render week days */}
          {weekdays.map(day => (
            <View key={day} style={styles.checkboxContainer}>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? theme.colors.primary : undefined}
              />
              <Text
                style={[
                  styles.sectionText,
                  {
                    fontFamily: 'Inter-SemiBold',

                    width: '28%',
                  },
                ]}
              >
                {day}
              </Text>
              <View style={styles.timePickerContainer}>
                {/* start time  picker */}
                <View style={styles.dateField}>
                  {Platform.OS === 'web' ? (
                    <TextInput
                      autoCorrect={false}
                      autoCapitalize='words'
                      placeholder='10:00'
                      onChangeText={setSelectedStartDate}
                      value={selectedStartDate}
                      placeholderTextColor={theme.colors.primary}
                      style={[
                        styles.input,
                        { backgroundColor: theme.colors.accent },
                      ]}
                    />
                  ) : (
                    <Pressable
                      onPress={
                        Platform.select === 'web' ? undefine : openDatePicker
                      }
                      style={styles.pressable}
                    >
                      <View
                        style={[styles.inputContainer, { borderRadius: 6 }]}
                      >
                        <Text style={styles.inputText}>{time || '00:00'}</Text>
                      </View>
                    </Pressable>
                  )}
                </View>

                {/* end time picker */}

                <View style={styles.dateField}>
                  {Platform.OS === 'web' ? (
                    <TextInput
                      autoCorrect={false}
                      autoCapitalize='words'
                      placeholder='10:00'
                      onChangeText={setSelectedStartDate}
                      value={selectedStartDate}
                      placeholderTextColor={theme.colors.primary}
                      style={[
                        styles.input,
                        { backgroundColor: theme.colors.accent },
                      ]}
                    />
                  ) : (
                    <Pressable
                      onPress={
                        Platform.select === 'web' ? undefine : openDatePicker
                      }
                      style={styles.pressable}
                    >
                      <View
                        style={[styles.inputContainer, { borderRadius: 6 }]}
                      >
                        <Text style={styles.inputText}>{time || '00:00'}</Text>
                      </View>
                    </Pressable>
                  )}
                </View>
              </View>
            </View>
          ))}
          {/* end of render week days */}
        </View>
        {/*buttons  */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
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

        {/* model */}
        <DatePickerModal
          startedDate={startedDate}
          isOpen={openStartDatePicker}
          onClose={handleCloseModal}
          handleChangeStartDate={handleChangeStartDate}
          onSelectedChange={date => setSelectedStartDate(date)}
          selectedTime={selectedTime => setTime(selectedTime)}
          pickerType={pickerType}
        ></DatePickerModal>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const getStyles = theme => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.backgroundSecondary,
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

    timePickerContainer: {
      flexDirection: 'row',
      marginLeft: 10,
    },
  })
}

export default CreateActivity
