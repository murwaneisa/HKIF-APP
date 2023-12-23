import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native'
import React, { useState } from 'react'
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
  // State to manage if the password is visible or not
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }
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
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='First Name*'
          placeholderTextColor={theme.colors.text}
          style={styles.input}
        />
        <TextInput
          placeholder='Last Name*'
          placeholderTextColor={theme.colors.text}
          style={styles.input}
        />
        <TextInput
          placeholder='Email *'
          placeholderTextColor={theme.colors.text}
          keyboardType='email-address'
          style={styles.input}
        />
        <TextInput
          placeholder='Phone*'
          placeholderTextColor={theme.colors.text}
          keyboardType='phone-pad'
          style={styles.input}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder='Password*'
            placeholderTextColor={theme.colors.text}
            secureTextEntry={!isPasswordVisible} // Toggle based on the state
            style={[styles.input, { marginVertical: 0 }]}
          />
          <TouchableOpacity
            style={styles.visibilityToggle}
            onPress={togglePasswordVisibility}
          >
            <Feather
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={24}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        </View>
      </View>
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
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      borderWidth: 4,
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
        ios: 17.5,
        android: 15,
        web: 22.5,
      }),
    },
    inputContainer: {
      padding: 20,
      width: '100%',
    },
    input: {
      height: 50,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: theme.colors.accent2,
      padding: 10,
      borderRadius: 10,
      fontSize: 16,
      backgroundColor: theme.colors.accent2,
    },
    passwordContainer: {
      backgroundColor: theme.colors.accent2,
      borderRadius: 10,
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
    },
    visibilityToggle: {
      position: 'absolute',
      right: 10,
      height: '100%',
      justifyContent: 'center',
      paddingRight: 10,
    },
  })
}

export default AddLeader
