import React from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { useTheme } from '../../Styles/theme'
import CountryPicker from './CountryPicker'

function Input({
  label,
  textInputConfig,
  rightIcon,
  countryCode,
  error,
  type,
  options,
  data,
  onValueChange,
}) {
  const { theme } = useTheme()
  const styles = getStyles(theme)
  const screenWidth = Dimensions.get('window').width
  const isWideScreen = screenWidth >= 1048
  /* 
  let inputElement = null

  if (type === 'dropdown' && options) {
    inputElement = (
      <Picker style={styles.input} {...textInputConfig}>
        {options.map((option, index) => (
          <Picker.Item key={index} label={option.label} value={option.value} />
        ))}
      </Picker>
    )
  } else {
    inputElement = 
  } */

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {countryCode && (
          <View style={{ flex: 1 }}>
            <CountryPicker
              data={data}
              selectedValue={countryCode}
              onValueChange={onValueChange}
            />
          </View>
        )}
        <View style={{ flex: isWideScreen ? 9 : 3 }}>
          <TextInput style={styles.input} {...textInputConfig} />
        </View>
      </View>
      {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    inputContainer: {
      marginHorizontal: 4,
      marginVertical: 8,
    },
    label: {
      fontFamily: 'Inter-SemiBold',
      fontSize: Platform.select({
        ios: 18,
        android: 12,
        web: 18,
      }),
      color: theme.colors.text,
      marginBottom: 5,
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
    invalidInput: {
      borderColor: 'red',
      borderWidth: 1,
    },
    errorText: {
      color: 'red',
      fontSize: 12,
    },
  })

export default Input
