import React from 'react'
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native'
import { useTheme } from '../../Styles/theme'

function Input({ label, value, onChangeText, rightIcon, ...textInputConfig }) {
  const { theme } = useTheme()
  const styles = getStyles(theme)

  return (
    <View style={styles.inputContainer}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          {...textInputConfig}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
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
    inputWrapper: {
      position: 'relative',
    },
    input: {
      flex: 1,
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
    rightIcon: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      padding: 10,
      backgroundColor: theme.colors.accent,
      borderTopRightRadius: 6,
      borderBottomRightRadius: 6,
    },
  })

export default Input
