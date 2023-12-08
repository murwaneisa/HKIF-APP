import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import React from 'react'
import { useTheme } from '../../../Styles/theme'
import Input from '../../../Utilities/UI/Input'
import DatePicker from 'react-native-modern-datepicker'
import { useState } from 'react'
import DatePickerModal from '../../../Utilities/UI/Model'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const AddEvent = () => {
  const { theme } = useTheme()
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false)
  const [pickerType, setPickerType] = useState('date') // New state for picker type
  const [startedDate, setStartedDate] = useState('12/12/2023')
  const [selectedStartDate, setSelectedStartDate] = useState('')
  const [time, setTime] = useState('')
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
    <View style={styles.container}>
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
            <Text style={styles.sectionText}>Starts</Text>
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
                style={[styles.input, { backgroundColor: theme.colors.accent }]}
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
                style={[styles.input, { backgroundColor: theme.colors.accent }]}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.startDate}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionText}>Ends</Text>
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
                style={[styles.input, { backgroundColor: theme.colors.accent }]}
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
                style={[styles.input, { backgroundColor: theme.colors.accent }]}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <DatePickerModal isOpen={openStartDatePicker} onClose={handleCloseModal}>
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
    </View>
  )
}

const getStyles = theme => {
  return StyleSheet.create({
    container: {
      flex: 1,
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
      fontFamily: 'Inter-SemiBold',
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
