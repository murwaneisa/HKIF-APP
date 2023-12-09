import React from 'react'
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'

import { useTheme } from '../../Styles/theme'

function Input({ label, textInputConfig, type, options }) {
  const { theme } = useTheme()
  const styles = getStyles(theme)
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
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TextInput style={styles.input} {...textInputConfig} />
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
  })

export default Input
