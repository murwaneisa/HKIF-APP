import React from 'react'
import { Text, StyleSheet, Pressable } from 'react-native'


const SettingsOptionCard = ({ title, onPress }) => {
 
   const styles = getStyles()

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  )
}

const getStyles =()=>
  StyleSheet.create({
    container: {
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: 'green',
    },
    title: {
      fontSize: 15,
      color: '#6B6B6B',
      fontFamily: 'Inter-SemiBold',
    },
  })

export default SettingsOptionCard
