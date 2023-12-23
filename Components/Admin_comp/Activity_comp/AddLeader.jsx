import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useTheme } from '../../../Styles/theme'
import { Platform } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'

const AddLeader = () => {
  const { theme, isDarkMode } = useTheme()
  console.log(isDarkMode)
  const styles = getStyles(theme, isDarkMode)
  const userIcon = Platform.select({
    ios: 50,
    android: 50,
    web: 70,
  })
  const plusIcon = Platform.select({
    ios: 28,
    android: 28,
    web: 45,
  })
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        {/*    <Image source={source} style={styles.icon} /> */}
        {/* Using Ionicons for the profile icon */}
        <Feather name='user' size={userIcon} color='black' />
        {/* Plus icon in the bottom right corner */}
        <View style={styles.plusIconContainer}>
          <Entypo name='plus' size={plusIcon} color='#ffffff' />
        </View>
      </TouchableOpacity>
      <View style={styles.inputContainer}></View>
    </View>
  )
}

const getStyles = (theme, isDarkMode) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundSecondary,
      alignItems: 'center',
      padding: Platform.select({
        android: '5%',
        ios: '5%',
        web: '10%',
      }),
    },

    icon: {
      width: 48, // Slightly smaller than the container to create a border effect
      height: 48,
      borderRadius: 24, // Again, half the size for circular image
    },
    iconContainer: {
      width: Platform.select({
        android: 90,
        ios: 90,
        web: 150,
      }), // Set the width of the icon container
      height: Platform.select({
        android: 90,
        ios: 90,
        web: 150,
      }),
      borderRadius: Platform.select({
        android: 45,
        ios: 45,
        web: 75,
      }),
      backgroundColor: '#ffffff', // Background color for the icon container
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative', // Required for positioning the plus icon
      borderWidth: 4, // Width of the border
      borderColor: isDarkMode ? theme.colors.accent : '#C4C4C4',
    },
    plusIconContainer: {
      backgroundColor: isDarkMode ? theme.colors.accent : '#C4C4C4',
      position: 'absolute',
      bottom: -4,
      right: -6,
      alignItems: 'center',
      justifyContent: 'center',
      width: Platform.select({
        ios: 35,
        android: 30,
        web: 45,
      }),
      height: Platform.select({
        ios: 35,
        android: 30,
        web: 45,
      }),
      borderRadius: Platform.select({
        ios: 17.5, // Half of 28
        android: 15, // Half of 35
        web: 22.5, // Half of 45
      }),
    },

    inputContainer: {},
  })
}

export default AddLeader
