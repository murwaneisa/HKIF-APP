import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'

const BenefitCard = ({ title }) => {
 
   const styles = getStyles()
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

const getStyles =()=>
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
      color: '#6B6B6B',
    },
    icon: {
      fontSize: 18,
      color: 'green',
      marginRight: Platform.select({
        ios: 4,
        android: 4,
        web: 6,
      }),
    },
  })

export default BenefitCard
