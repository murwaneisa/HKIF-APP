import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Pressable,
} from 'react-native'
import { useTheme } from '../Styles/theme'

const SettingsOptionCard = ({ title, onPress }) => {
  const { theme } = useTheme()
  const styles = getStyles(theme)

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    title: {
      fontSize: 15,
      color: theme.colors.text,
      fontFamily: 'Inter-SemiBold',
    },
  })

export default SettingsOptionCard
