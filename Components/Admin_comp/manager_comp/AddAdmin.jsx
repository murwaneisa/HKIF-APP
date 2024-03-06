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
  Alert,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../../Styles/theme'
import { Platform } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import DropdownRole from '../DropdownRole'
import HKIFImagePicker from '../../../Utilities/Helper/HKIFImagePicker'
import {
  deleteAdmin,
  deleteAdminThunk,
  getFullAdminInfoByID,
  registerAdmin,
  registerAdminThunk,
  updateAdmin,
  updateAdminThunk,
} from '../../../Utilities/Axios/admin'
import { Formik, useFormikContext } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

// Function to get dynamic validation schema
const getAdminValidationSchema = adminId => {
  let schemaFields = {
    firstName: Yup.string().required('Please enter a first name'),
    lastName: Yup.string().required('Please enter a last name'),
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Email is required'),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, 'Please enter a valid 10-digit phone number')
      .required('Phone number is required'),
    role: Yup.array()
      .min(1, 'Please select at least one role')
      .required('Roles are required'),
  }

  // Add password validation only if there's no adminId (i.e., adding a new admin)
  if (!adminId) {
    schemaFields.password = Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
  }

  return Yup.object().shape(schemaFields)
}

const AddAdmin = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const admins = useSelector(state => state.admin.data)
  console.log('the admins', admins)
  const { theme, isDarkMode } = useTheme()
  const { adminId } = route?.params || {}
  const adminValidationSchema = getAdminValidationSchema(adminId)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [initialFormValues, setInitialFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    role: [],
    image: '',
    _id: '',
  })
  const data = [
    { label: 'Activity manager', value: 'ACTIVITY_MANAGER' },
    { label: 'Event manager', value: 'EVENT_MANAGER' },
  ]

  useEffect(() => {
    const fetchAdminInfo = async () => {
      if (adminId) {
        try {
          const adminInfo = await getFullAdminInfoByID(adminId)
          console.log('the admin info', adminInfo)
          setInitialFormValues({
            firstName: adminInfo.firstName || '',
            lastName: adminInfo.lastName || '',
            email: adminInfo.email || '',
            phoneNumber: adminInfo.phoneNumber || '',
            role: adminInfo.role || [], // Adjust according to your roles data structure
            image: adminInfo.imageUrl || '',
            _id: adminInfo._id || '',
          })
        } catch (error) {
          console.error('Error fetching admin info:', error)
        }
      } else {
        setInitialFormValues({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          role: [],
          image: '',
          password: '', // Add this line to include the password in the initial form values
        })
      }
    }
    fetchAdminInfo()
  }, [adminId])

  const [image, setImage] = useState(null)
  const [isFormValid, setIsFormValid] = useState(false)
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

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handlePickImage = async () => {
    const uri = await HKIFImagePicker.pickImage()
    if (uri) {
      setImage(uri)
      await handleUploadImage()
    }
  }

  const handleUploadImage = async () => {
    if (image) {
      await HKIFImagePicker.uploadImageAsync(image)
    }
  }

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (adminId) {
        // If adminId exists, update the admin
        const response = await dispatch(
          updateAdminThunk({ adminId: adminId, updates: values })
        )

        console.log('the response', response.payload)
        if (
          response.payload &&
          response.payload.message === 'Admin updated successfully'
        ) {
          console.log(response.payload.message)
          // Optionally reset form here if needed
        }
      } else {
        // If adminId does not exist, register a new admin
        console.log('values in the create admin', registerResponse)
        const registerResponse = await dispatch(registerAdminThunk(values))

        // Check if the registration was successful
        if (registerResponse.meta.requestStatus === 'fulfilled') {
          // Reset the form fields to initial values after successful registration
          resetForm()
          // Optionally navigate away or provide feedback to the user
          Alert.alert('Success', 'Admin registered successfully')
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      // Handle form submission errors appropriately (e.g., display error message)
    } finally {
      setSubmitting(false) // Ensure to stop the submission process
    }
  }
  const handleDelete = async () => {
    //To do: navigate the admin after you delete
    const response = await dispatch(deleteAdminThunk(adminId))
    Alert.alert('Success', 'Admin deleted successfully', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ])
    if (response.status === 200) {
      console.log(
        'the response in handle delete function',
        response.meta.requestStatus
      )
    } else {
    }
  }

  return (
    <Formik
      initialValues={initialFormValues}
      enableReinitialize // Important to set this so formik resets initialValues when they change
      validationSchema={adminValidationSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
        isValid,
        dirty,
      }) => (
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
                <TextInput
                  placeholder='First Name*'
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  style={styles.input}
                />
                {/* Display errors */}
                {errors.firstName && touched.firstName && (
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                )}
                <TextInput
                  placeholder='Last Name*'
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  placeholderTextColor={theme.colors.text}
                  style={styles.input}
                />
                {/* Display errors */}
                {errors.lastName && touched.lastName && (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                )}
                <DropdownRole
                  data={data}
                  placeholder={'Select admin'}
                  selectedRoles={values.role}
                  setFieldValue={setFieldValue}
                  /*  setInitialFormValues={setInitialFormValues} */
                />
                {/* Display errors */}
                {errors.role && touched.role && (
                  <Text style={styles.errorText}>{errors.role}</Text>
                )}
                <TextInput
                  placeholder='Email *'
                  onBlur={handleBlur('email')}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholderTextColor={theme.colors.text}
                  keyboardType='email-address'
                  style={styles.input}
                />
                {/* Display errors */}
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <TextInput
                  placeholder='phone'
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                  placeholderTextColor={theme.colors.text}
                  keyboardType='phone-pad'
                  style={styles.input}
                />
                {/* Display errors */}
                {errors.phoneNumber && touched.phoneNumber && (
                  <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                )}
                {!adminId && (
                  <>
                    <View style={styles.passwordContainer}>
                      <TextInput
                        placeholder='Password*'
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
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
                    {errors.password && touched.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </>
                )}
                {/*buttons  */}
                <View style={styles.buttonContainer}>
                  <Pressable
                    style={[
                      styles.button,
                      {
                        backgroundColor:
                          isValid && dirty
                            ? theme.colors.primary
                            : theme.colors.primary200,
                      },
                    ]}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.buttonText}>
                      {adminId ? 'Edit Admin' : 'Add Admin'}
                    </Text>
                  </Pressable>
                  {adminId ? (
                    <Pressable
                      style={[
                        styles.button,
                        { backgroundColor: theme.colors.error },
                      ]}
                      onPress={handleDelete}
                    >
                      <Text style={styles.buttonText}>Delete Admin</Text>
                    </Pressable>
                  ) : null}
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
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
