import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import React from 'react'
import { useTheme } from '../../../Styles/theme'
import Input from '../../../Utilities/UI/Input'
import DatePicker from 'react-native-modern-datepicker'
import { useState } from 'react'
import DatePickerModal from '../../../Utilities/UI/Model'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import Checkbox from 'expo-checkbox'

const AddEvent = () => {
  const { theme } = useTheme()
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false)
  const [pickerType, setPickerType] = useState('date') // New state for picker type
  const [startedDate, setStartedDate] = useState('12/12/2023')
  const [selectedStartDate, setSelectedStartDate] = useState('')
  const [time, setTime] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [showCheck, setCheck] = useState(true)
  const [isChecked, setChecked] = useState(false)
  const styles = getStyles(theme)

  const openDatePicker = () => {
    setPickerType('date')
    setOpenStartDatePicker(true)
  }

  const openTimePicker = () => {
    setPickerType('time')
    setOpenStartDatePicker(true)
  }

  const handleCloseModal = () => {
    setOpenStartDatePicker(false)
  }
  function handleChangeStartDate(propDate) {
    setStartedDate(propDate)
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background2 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* title */}
        <View
          style={[
            styles.sectionContainer,
            { backgroundColor: theme.colors.accent2 },
          ]}
        >
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionText}>Title</Text>
          </View>
          <TextInput
            placeholderTextColor={theme.colors.text}
            style={styles.input}
          />
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
                style={[styles.sectionText, { fontFamily: 'Inter-SemiBold' }]}
              >
                Starts
              </Text>
            </View>
            <TouchableWithoutFeedback onPress={openDatePicker}>
              <View style={styles.dateField}>
                <TextInput
                  autoCorrect={false}
                  autoCapitalize='words'
                  placeholder='Aug 21 2002'
                  value={selectedStartDate}
                  placeholderTextColor={theme.colors.primary}
                  editable={false}
                  style={[
                    styles.input,
                    { backgroundColor: theme.colors.accent },
                  ]}
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={openTimePicker}>
              <View style={styles.dateField}>
                <TextInput
                  autoCorrect={false}
                  autoCapitalize='words'
                  placeholder='10:00'
                  placeholderTextColor={theme.colors.primary}
                  value={time}
                  editable={false}
                  style={[
                    styles.input,
                    { backgroundColor: theme.colors.accent },
                  ]}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.startDate}>
            <View style={styles.sectionTitle}>
              <Text
                style={[styles.sectionText, { fontFamily: 'Inter-SemiBold' }]}
              >
                Ends
              </Text>
            </View>
            <TouchableWithoutFeedback onPress={openDatePicker}>
              <View style={styles.dateField}>
                <TextInput
                  autoCorrect={false}
                  autoCapitalize='words'
                  placeholder='Aug 21 2002'
                  placeholderTextColor={theme.colors.primary}
                  value={selectedStartDate}
                  editable={false}
                  style={[
                    styles.input,
                    { backgroundColor: theme.colors.accent },
                  ]}
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={openTimePicker}>
              <View style={styles.dateField}>
                <TextInput
                  autoCorrect={false}
                  autoCapitalize='words'
                  placeholder='10:00'
                  placeholderTextColor={theme.colors.primary}
                  value={time}
                  editable={false}
                  style={[
                    styles.input,
                    { backgroundColor: theme.colors.accent },
                  ]}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        {/* location */}
        <View
          style={[
            styles.sectionContainer,
            { backgroundColor: theme.colors.accent2 },
          ]}
        >
          <View style={styles.sectionTitle}>
            <Entypo name='location' size={24} color={theme.colors.text} />
          </View>
          <TextInput
            placeholder='Add location'
            placeholderTextColor={theme.colors.text}
            style={styles.input}
          />
        </View>
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
          {showCheck && (
            <View>
              <View style={styles.checkboxContainer}>
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? theme.colors.primary : undefined}
                />
                <Text
                  style={[styles.sectionText, { fontFamily: 'Inter-SemiBold' }]}
                >
                  Food
                </Text>
              </View>
              <View style={styles.checkboxContainer}>
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? theme.colors.primary : undefined}
                />
                <Text
                  style={[styles.sectionText, { fontFamily: 'Inter-SemiBold' }]}
                >
                  Drinks
                </Text>
              </View>
              <View style={styles.checkboxContainer}>
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? theme.colors.primary : undefined}
                />
                <Text
                  style={[styles.sectionText, { fontFamily: 'Inter-SemiBold' }]}
                >
                  Games
                </Text>
              </View>
            </View>
          )}
        </View>
        {/* model */}
        <DatePickerModal
          isOpen={openStartDatePicker}
          onClose={handleCloseModal}
        >
          {pickerType === 'date' && (
            <DatePicker
              mode='calendar'
              selected={startedDate}
              onDateChanged={handleChangeStartDate}
              onSelectedChange={date => setSelectedStartDate(date)}
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
              onTimeChange={selectedTime => setTime(selectedTime)}
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
        </DatePickerModal>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const getStyles = theme => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background2,
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
    dateField: {
      marginHorizontal: 8,
    },
    input: {
      backgroundColor: theme.colors.accent2,
      color: theme.colors.text,
      padding: Platform.select({
        ios: 10,
        android: 6,
        web: 16,
      }),
      borderRadius: 6,
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
  })
}

export default AddEvent
