import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'

import { Feather } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'

const ProfileTextField = ({
  value,
  placeholder,
  iconName,
  onChangeText,
  keyboardType,
}) => {
 
   const styles = getStyles()

  return (
    <View style={styles.container}>
      <View style={styles.iconTextWrapper}>
        <Feather name={iconName} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={'#6B6B6B'}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  )
}

const getStyles =()=>
  StyleSheet.create({
    container: {
      backgroundColor: 'gray',
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
      color: 'green',
      fontSize: 16,
      marginRight: 8,
      marginLeft: 20,
    },
    input: {
      flex: 1,
      color: 'black',
      fontFamily: 'Inter-SemiBold',
      fontSize: 15,
      paddingVertical: 20,
    },
  })

export default ProfileTextField
