import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { useTheme } from '../Styles/theme'

import StegOne from '../Components/Register/StegOne'
import StegTwo from '../Components/Register/StegTwo'
import StegThree from '../Components/Register/StegThree'
import StegFour from '../Components/Register/StegFour'
import StegFive from '../Components/Register/StegFive'
import { useDispatch, useSelector } from 'react-redux'
import { registerAndLoginUser } from '../Utilities/Redux/Actions/userActions'

function Register() {
  const screenWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, screenWidth)

  const [currentStep, setCurrentStep] = useState(1)

  const data = useSelector(state => state.registration)
  const dispatch = useDispatch()

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      // Handle the final submission
      console.log('Final Form Data:')
      console.log(data)
      dispatch(registerAndLoginUser(data))
      // navigate to another screen or perform the submission action
    }
  }
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }
  const totalSteps = 5

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StegOne styles={styles} goToNextStep={goToNextStep} />
      case 2:
        return (
          <StegTwo
            styles={styles}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        )
      case 3:
        return (
          <StegThree
            styles={styles}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        )
      case 4:
        return (
          <StegFour
            styles={styles}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        )
      case 5:
        return (
          <StegFive
            styles={styles}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        )
      default:
        return null
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.colors.backgroundPrimary }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled' // This ensures taps are not dismissed when the keyboard is open
      >
        <View style={styles.container}>
          <Text style={styles.headerText}>
            <Text> Welcome to </Text>
            <Text style={styles.hkifText}>HKIF</Text>
          </Text>
          <View style={styles.inputContainer}>{renderStep()}</View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    scrollViewContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      alignItems: Platform.select({
        ios: 'center',
        android: 'center',
        web: 'center',
      }),
      paddingHorizontal: '6%',
      backgroundColor: theme.colors.backgroundPrimary,
    },
    inputContainer: {
      flex: 1,
      width: '100%',
      // Add any additional styling you need for the container of your inputs
    },
    headerText: {
      textAlign: 'center',
      color: theme.colors.text,
      fontFamily: 'Inter-Bold',
      fontSize: Platform.select({
        ios: 30,
        android: 25,
        web: 35,
      }),
      margin: Platform.select({
        ios: '5%',
        android: '5%',
        web: '3%',
      }),
    },
    hkifText: {
      color: theme.colors.primary,
    },
    headerSubText: {
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: Platform.select({
        ios: 12,
        android: 12,
        web: 30,
      }),
      margin: Platform.select({
        ios: '10%',
        android: '10%',
        web: '3%',
      }),
    },
    buttonsContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '6%',
      marginTop: Platform.select({
        ios: '6%',
        android: '6%',
        web: '3%',
      }),
    },
    buttonWrapper: {
      marginBottom: 10,
      width: Platform.select({
        ios: '70%',
        android: '70%',
        web: '40%',
      }),
      alignSelf: 'center', // This will center the button wrapper within its parent
    },
    textStyle: {
      fontFamily: 'Inter-SemiBold',
      paddingVertical: '1%',
      color: theme.colors.text,
      textAlign: 'center',
      fontSize: Platform.select({
        ios: 15,
        android: 15,
      }),
    },
    datePicker: {
      height: 120,
      marginVertical: 20,
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
    errorText: {
      fontSize: Platform.select({
        ios: 13,
        android: 12,
        web: 16,
      }),
      color: 'red',
      paddingHorizontal: 4,
      paddingTop: 4,
    },
  })

export default Register
