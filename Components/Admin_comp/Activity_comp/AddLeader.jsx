import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '../../../Styles/theme'
import { Platform } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import DropdownRole from '../DropdownRole'
import HKIFImagePicker from '../../../Utilities/Helper/HKIFImagePicker'

const AddLeader = ({ route }) => {
  const { theme, isDarkMode } = useTheme()
  const { leaderId } = route?.params || {}
  const [image, setImage] = useState(null)
  console.log(image)
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

  const handlePickImage = async () => {
    const uri = await HKIFImagePicker.pickImage()
    if (uri) {
      setImage(uri)
    }
  }

  const handleUploadImage = async () => {
    if (image) {
      await HKIFImagePicker.uploadImageAsync(image)
    }
  }

  const data = [
    { label: 'Soccer', value: '1' },
    { label: 'Basketball', value: '2' },
    { label: 'Tennis', value: '3' },
    { label: 'Baseball', value: '4' },
    { label: 'Volleyball', value: '5' },
    { label: 'Swimming', value: '6' },
    { label: 'Track and Field', value: '7' },
    { label: 'Golf', value: '8' },
  ]

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.backgroundSecondary }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 80}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollContainer}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={handlePickImage}
          >
            {image ? (
              <Image
                style={styles.image}
                source={{
                  uri: image,
                }}
                resizeMode='cover'
              />
            ) : (
              <Feather name='user' size={userIcon} color='#C4C4C4' />
            )}

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
            <DropdownRole data={data} placeholder={'Select Activity'} />
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
                secureTextEntry={!isPasswordVisible}
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
            {/*buttons  */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: theme.colors.primary },
                ]}
              >
                <Text style={styles.buttonText}>
                  {leaderId ? 'Edit leader' : 'Add Leader'}
                </Text>
              </TouchableOpacity>
              {leaderId ? (
                <TouchableOpacity
                  style={[
                    styles.button,
                    { backgroundColor: theme.colors.error },
                  ]}
                >
                  <Text style={styles.buttonText}>Delete leader</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    ScrollContainer: {
      backgroundColor: theme.colors.backgroundSecondary,
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
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 120,
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
    buttonContainer: {
      marginVertical: 10,
      justifyContent: 'space-between',
    },
    button: {
      width: '100%',
      borderRadius: 8,
      padding: 12,
      alignItems: 'center',
      marginVertical: 10,
    },
    buttonText: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: Platform.select({
        ios: 16,
        android: 15,
        web: 18,
      }),
    },
  })
}

export default AddLeader
