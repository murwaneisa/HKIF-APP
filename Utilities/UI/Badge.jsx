import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme } from '../../Styles/theme'
import { FontAwesome5 } from '@expo/vector-icons'

const Badge = ({ children }) => {
  const { theme } = useTheme()
  const styles = getStyles(theme)
  let iconsName
  if (children == 'Full Membership') {
    iconsName = 'crown'
  } else if (children == 'Member') {
    iconsName = 'medal'
  }

  return (
    <View style={styles.badgeContainer}>
      <View style={styles.checkmarkCircle}>
        {children === 'Not Member' ? (
          <FontAwesome5 name='sad-tear' size={24} color='black' />
        ) : (
          <MaterialCommunityIcons name={iconsName} size={28} color='#FFB743' />
        )}
      </View>
      <Text style={styles.badgeText}>{children}</Text>
    </View>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    badgeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#D4ECD9',
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 20,
    },
    checkmarkCircle: {
      width: 24,
      height: 24,
      marginRight: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkmarkText: {
      color: 'white',
      fontWeight: 'bold',
    },
    badgeText: {
      color: '#5CB85C',
      fontWeight: 'bold',
      marginLeft: 5,
    },
  })

export default Badge
