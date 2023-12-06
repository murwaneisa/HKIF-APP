import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native'
import React from 'react'
import { useTheme } from '../../../Styles/theme'
import Input from '../../../Utilities/UI/Input'
import DatePicker from 'react-native-modern-datepicker'
import { useState } from 'react'

const AddEvent = () => {
  const { theme } = useTheme()
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false)
  const [startedDate, setStartedDate] = useState('12/12/2023')
  const [selectedStartDate, setSelectedStartDate] = useState('')
  const styles = getStyles(theme)

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker)
  }
  function handleChangeStartDate(propDate) {
    setStartedDate(propDate)
  }
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder='Title'
          placeholderTextColor={theme.colors.text}
          style={styles.input}
        />
        <Pressable onPress={handleOnPressStartDate}>
          <TextInput
            label='Birthday Date'
            autoCorrect={false}
            autoCapitalize='words'
            placeholder='set Aug 21 2002'
            editable={false}
            style={styles.input}
          />
        </Pressable>
        <Modal
          animationType='slide'
          transparent={true}
          visible={openStartDatePicker}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
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
              <TouchableOpacity onPress={handleOnPressStartDate}>
                <Text style={{ color: theme.colors.primary }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
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
    input: {
      backgroundColor: theme.colors.accent,
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
