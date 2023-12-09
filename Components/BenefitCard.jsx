import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { useTheme } from '../Styles/theme'
import { Ionicons } from '@expo/vector-icons'

const BenefitCard = ({ iconName, title }) => {
  const { theme } = useTheme()
  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <Ionicons name={iconName} style={styles.icon} />
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      paddingVertical: Platform.select({
        ios: 5,
        android: 5,
        web: 5,
      }),
      marginRight: Platform.select({
        ios: 10,
        android: 10,
        web: 10,
      }),
      minWidth: 75,
      flexDirection: 'row',
    },
    text: {
      fontFamily: 'Inter-Regular',
      fontSize: Platform.select({
        ios: 16,
        android: 16,
        web: 18,
      }),
    },
    icon: {
      fontSize: 17,
      color: 'black',
      marginRight: Platform.select({
        ios: 4,
        android: 4,
        web: 6,
      }),
    },
  })

export default BenefitCard
