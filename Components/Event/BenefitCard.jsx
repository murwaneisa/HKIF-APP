import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { useTheme } from '../../Styles/theme'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'

const BenefitCard = ({ title }) => {
  const { theme } = useTheme()
  const styles = getStyles(theme)
  let icon

  switch (title) {
    case 'FOOD':
      icon = <MaterialCommunityIcons name='food-turkey' style={styles.icon} />
      break
    case 'DRINK':
      icon = <MaterialCommunityIcons name='beer' style={styles.icon} />
      break
    case 'GAMES':
      icon = <MaterialIcons name='sports-kabaddi' style={styles.icon} />
      break
  }

  return (
    <View style={styles.container}>
      {icon}
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
      minWidth: 40,
      flexDirection: 'row',
    },
    text: {
      fontFamily: 'Inter-Medium',
      fontSize: Platform.select({
        ios: 14,
        android: 14,
        web: 18,
      }),
      color: theme.colors.text,
    },
    icon: {
      fontSize: 18,
      color: theme.colors.primary,
      marginRight: Platform.select({
        ios: 4,
        android: 4,
        web: 6,
      }),
    },
  })

export default BenefitCard
