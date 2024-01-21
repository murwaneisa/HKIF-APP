import React from 'react'
import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import { useTheme } from '../../Styles/theme'

const SettingsSection = ({ title, children }) => {
  const { theme } = useTheme()
  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      marginBottom: 30,
    },
    title: {
      fontSize: 12,
      fontFamily: 'Inter-Bold',
      marginBottom: 4,
      color: theme.colors.title,
    },
  })

export default SettingsSection
