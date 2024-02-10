import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../../Styles/theme'
import { Platform } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import DropdownRole from '../DropdownRole'
import HKIFImagePicker from '../../../Utilities/Helper/HKIFImagePicker'
import { getFullAdminInfoByID } from '../../../Utilities/Axios/admin'

const AddAdmin = ({ route }) => {
  const { theme, isDarkMode } = useTheme()
  const { adminId } = route?.params || {}
  const data = [
    { label: 'Super admin', value: 1 },
    { label: 'Activity manager', value: 2 },
    { label: 'Event manager', value: 3 },
  ]

  // 1. Setting up state for input validation
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    roles: [],
    image: '',
  })
  const [selectedRoles, setSelectedRoles] = useState([])

  useEffect(() => {
    const getAdmin = async () => {
      try {
        const adminInfo = await getFullAdminInfoByID(adminId)
        console.log('the admin data', adminInfo)
        adminInfo.role.map(role =>
          role === 'SUPERADMIN'
            ? setSelectedRoles(prevSelectedRoles => [...prevSelectedRoles, 1])
            : role === 'ACTIVITY_MANAGER'
            ? setSelectedRoles(prevSelectedRoles => [...prevSelectedRoles, 2])
            : setSelectedRoles(prevSelectedRoles => [...prevSelectedRoles, 3])
        )
        setForm({
          firstName: adminInfo.firstName || '',
          lastName: adminInfo.lastName || '',
          email: adminInfo.email || '',
          phone: adminInfo.phoneNumber || '', // You can add the phone value from adminInfo if available
          password: adminInfo.password || '', // You may not want to set the password in the form like this
          image: adminInfo.imageUrl || '',
          roles: adminInfo.role || [],
        })
      } catch (error) {
        console.error('Error fetching admins info:', error)
      }
    }
    getAdmin()
  }, [adminId])

  const [image, setImage] = useState(null)
  const [isFormValid, setIsFormValid] = useState(false)
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

  console.log('the selection role is i the main function', selectedRoles)

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

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    roles: '',
  })

  const validateInput = (name, value, selectedRoles) => {
    // Add your validation logic here for different fields
    let error = ''
    switch (name) {
      case 'firstName':
        if (value === '') {
          error = 'Please enter a first name'
        }
        break
      case 'lastName':
        if (value === '') {
          error = 'Please enter a last name'
        }
        break
      case 'email':
        // simple email regex, you might want a better one
        if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Please enter a valid email'
        }
        break
      case 'phone':
        if (!/^\d{10}$/.test(value)) {
          // Example for US numbers
          error = 'Please enter a valid 10-digit phone number'
        }
        break
      case 'password':
        if (value === '') {
          error = 'Please enter a password'
        }
        break
      case 'roles':
        if (!selectedRoles || selectedRoles.length === 0) {
          error = 'Please select an activity'
        }
        break
      // ... add other case checks as needed
    }
    return error
  }

  const handleSelectionChange = selectedItems => {
    console.log('the selected items', selectedItems)
    setSelectedRoles(selectedItems)
    // Update form state with the new roles
    setForm(prevForm => ({ ...prevForm, roles: selectedItems }))
    // Validate the roles field and update formErrors
    const error = validateInput('roles', null, selectedItems)
    setFormErrors(prevErrors => ({ ...prevErrors, roles: error }))
    // Update form validation status
    validateForm(
      { ...form, roles: selectedItems },
      { ...formErrors, roles: error }
    )
  }

  const handleInputChange = (name, value) => {
    // Update the form state and validate in sequence
    const newFormState = { ...form, [name]: value }
    const error = validateInput(name, value)
    const newErrors = { ...formErrors, [name]: error }

    setForm(newFormState)
    setFormErrors(newErrors)
    // Now validate form with updated values
    validateForm(newFormState, newErrors)
  }

  const validateForm = (formValues, errors) => {
    const allFieldsFilled = !Object.values(formValues).some(
      x => !x || (Array.isArray(x) && x.length === 0)
    )
    const noErrors = !Object.values(errors).some(x => x)
    setIsFormValid(allFieldsFilled && noErrors)
  }

  // Function to handle the form submission
  const handleSubmit = () => {
    // Validate all fields
    const newErrors = Object.keys(form).reduce((acc, fieldName) => {
      acc[fieldName] = validateInput(fieldName, form[fieldName], selectedRoles)
      return acc
    }, {})

    setFormErrors(newErrors) // Update the form errors state

    // Check if there are any errors
    const isValid = !Object.values(newErrors).some(error => error)
    setIsFormValid(isValid)

    if (isValid) {
      // Proceed with the form submission actions (e.g., API call)
      console.log('Form is valid, submit data: ', form)
      // Add your form submission logic here
    } else {
      console.log('Form has errors: ', newErrors)
      // Handle the error scenario, maybe inform the user to correct errors
    }
  }

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
          <Pressable style={styles.iconContainer} onPress={handlePickImage}>
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
          </Pressable>

          <View style={styles.inputContainer}>
            {!!formErrors.firstName && ( // Show error text if there's an error
              <Text style={styles.errorText}>{formErrors.firstName}</Text>
            )}
            <TextInput
              placeholder='First Name*'
              value={form.firstName}
              onChangeText={value => handleInputChange('firstName', value)}
              style={styles.input}
            />
            {!!formErrors.lastName && ( // Show error text if there's an error
              <Text style={styles.errorText}>{formErrors.lastName}</Text>
            )}
            <TextInput
              placeholder='Last Name*'
              value={form.lastName}
              onChangeText={value => handleInputChange('lastName', value)}
              placeholderTextColor={theme.colors.text}
              style={styles.input}
            />
            {!!formErrors.roles && ( // Show error text if there's an error
              <Text style={styles.errorText}>{formErrors.roles}</Text>
            )}
            <DropdownRole
              data={data}
              placeholder={'Select admin'}
              onSelectionChange={handleSelectionChange}
              setSelectedRoles={setSelectedRoles}
              selectedRoles={selectedRoles}
            />
            {!!formErrors.email && ( // Show error text if there's an error
              <Text style={styles.errorText}>{formErrors.email}</Text>
            )}
            <TextInput
              placeholder='Email *'
              value={form.email}
              onChangeText={value => handleInputChange('email', value)}
              placeholderTextColor={theme.colors.text}
              keyboardType='email-address'
              style={styles.input}
            />
            {!!formErrors.phone && ( // Show error text if there's an error
              <Text style={styles.errorText}>{formErrors.phone}</Text>
            )}
            <TextInput
              placeholder='Phone*'
              value={form.phone}
              onChangeText={value => handleInputChange('phone', value)}
              placeholderTextColor={theme.colors.text}
              keyboardType='phone-pad'
              style={styles.input}
            />
            {!!formErrors.password && ( // Show error text if there's an error
              <Text style={styles.errorText}>{formErrors.password}</Text>
            )}
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder='Password*'
                value={form.password}
                onChangeText={value => handleInputChange('password', value)}
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
                  {
                    backgroundColor: isFormValid
                      ? theme.colors.primary
                      : theme.colors.primary200,
                  },
                ]}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>
                  {adminId ? 'Edit Admin' : 'Add Admin'}
                </Text>
              </TouchableOpacity>
              {adminId ? (
                <TouchableOpacity
                  style={[
                    styles.button,
                    { backgroundColor: theme.colors.error },
                  ]}
                >
                  <Text style={styles.buttonText}>Delete Admin</Text>
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
        android: '2%',
        ios: '2%',
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
      width: '100%',
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

    errorText: {
      fontSize: Platform.select({
        ios: 13,
        android: 12,
        web: 16,
      }),
      color: 'red',
      paddingHorizontal: 4,
      paddingTop: 4,
    },
  })
}

export default AddAdmin
