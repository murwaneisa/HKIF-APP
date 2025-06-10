import React from 'react'
import { View, Text, StyleSheet, Image, Platform } from 'react-native'


const SettingsSection = ({ title, children }) => {
 
   const styles = getStyles()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  )
}

const getStyles =()=>
  StyleSheet.create({
    container: {
      marginBottom: 30,
    },
    title: {
      fontSize: 12,
      fontFamily: 'Inter-Bold',
      marginBottom: 4,
      color: 'black',
    },
  })

export default SettingsSection
