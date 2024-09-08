import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { useTheme } from '../../Styles/theme'
import { Feather } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'

const ProfileTextField = ({
  value,
  placeholder,
  iconName,
  onChangeText,
  rightIcon,
  ...textInputConfig
}) => {
  const { theme } = useTheme()
  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <View style={styles.iconTextWrapper}>
        <Feather name={iconName} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text}
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
    container: {
      backgroundColor: theme.colors.accent,
      flexDirection: 'row',
      borderRadius: 15,
      marginBottom: 20,
    },
    iconTextWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    icon: {
      color: theme.colors.primary,
      fontSize: 16,
      marginRight: 8,
      marginLeft: 20,
    },
    input: {
      flex: 1,
      color: theme.colors.title,
      fontFamily: 'Inter-SemiBold',
      fontSize: 15,
      paddingVertical: 20,
    },
    rightIcon: {
      marginRight: 20,
    },
  })

export default ProfileTextField
