import React from 'react'
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native'

import { Feather } from '@expo/vector-icons'

const UserInfoCard = ({ iconName, text, onPress }) => {
 
   const styles = getStyles()

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.iconTextWrapper}>
        <Feather name={iconName} style={styles.icon} />
        <Text style={styles.text} numberOfLines={1}>
          {text}
        </Text>
      </View>
      <Feather name='edit' style={styles.editIcon} />
    </Pressable>
  )
}

const getStyles =()=>
  StyleSheet.create({
    container: {
      backgroundColor: 'gray',
      flexDirection: 'row',
      padding: 20,
      borderRadius: 15,
      marginBottom: 20,
    },
    iconTextWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    icon: {
      color: 'green',
      fontSize: 16,
      marginRight: 8,
    },
    text: {
      color: '#6B6B6B',
      fontFamily: 'Inter-SemiBold',
      fontSize: 15,
      marginRight: 40,
    },
    editIconWrapper: {
      backgroundColor: 'red',
    },
    editIcon: {
      fontSize: 16,
      color: '#6B6B6B',
    },
  })

export default UserInfoCard
