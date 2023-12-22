import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useTheme } from '../../../Styles/theme'
import { Platform } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

const AddLeader = () => {
  const { theme } = useTheme()
  const styles = getStyles(theme)
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        {/*    <Image source={source} style={styles.icon} /> */}
        {/* Using Ionicons for the profile icon */}
        <Feather name='user' size={80} color='black' />
        {/* Plus icon in the bottom right corner */}
        <View style={styles.plusIconContainer}>
          <Ionicons name='add-circle' size={50} color='#C4C4C4' />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const getStyles = theme => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundSecondary,
      alignItems: 'center',
    },

    icon: {
      width: 48, // Slightly smaller than the container to create a border effect
      height: 48,
      borderRadius: 24, // Again, half the size for circular image
    },
    iconContainer: {
      width: 150, // Set the width of the icon container
      height: 150, // Set the height of the icon container
      borderRadius: 70, // Half the width/height to create a circle
      backgroundColor: '#EFEFEF', // Background color for the icon container
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative', // Required for positioning the plus icon
      borderWidth: 2, // Width of the border
      borderColor: '#C4C4C4', // Color of the border, set to red for example
    },
    plusIconContainer: {
      position: 'absolute',
      bottom: -4,
      right: 0,
      // Rest of your style for plusIconContainer...
    },
  })
}

export default AddLeader
