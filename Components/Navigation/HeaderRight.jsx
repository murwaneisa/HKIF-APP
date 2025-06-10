import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const HeaderRight = () => {
  const navigation = useNavigation()
 
   const styles = getStyles()

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Ionicons name='notifications-outline' style={styles.icon} />
      </TouchableOpacity>
    </View>
  )
}

const getStyles =()=>
  StyleSheet.create({
    wrapper: {
      marginRight: 15,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    icon: {
      fontSize: 30,
      color: '#6B6B6B',
    },
  })

export default HeaderRight
