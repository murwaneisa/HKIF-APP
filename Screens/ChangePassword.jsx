import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '../Styles/theme'
import ProfileTextField from '../Components/Profile/ProfileTextField'
import * as yup from 'yup'
import YupPassword from 'yup-password'
import { Formik } from 'formik'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
YupPassword(yup)

const validationSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .password()
    .required('Enter your current password'),
  newPassword: yup.string().password().required('Enter a new password'),
  confirmNewPassword: yup
    .string()
    .required('Please re-type your new password')
    .oneOf([yup.ref('newPassword')], 'Passwords does not match'),
})

const ChangePassword = ({ route }) => {
  const { theme } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const styles = getStyles(theme, windowWidth)

  const [data, setData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })

  const [visiblity, setVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  })

  const handleFormSubmit = async values => {
    console.log(values)
    // update users password
  }

  const RightIcon = ({ visible, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Feather name={!visible ? 'eye' : 'eye-off'} size={18} color='black' />
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentSection}>
        <Formik
          initialValues={data}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <ProfileTextField
                placeholder={'Current Password'}
                iconName={'lock'}
                value={values.currentPassword}
                onChangeText={handleChange('currentPassword')}
                onBlur={handleBlur('currentPassword')}
                secureTextEntry={!visiblity.currentPassword}
                autoCapitalize={'none'}
                autoCorrect={false}
                rightIcon={
                  <RightIcon
                    visible={visiblity.currentPassword}
                    onPress={() =>
                      setVisibility({
                        ...visiblity,
                        currentPassword: !visiblity.currentPassword,
                      })
                    }
                  />
                }
              />
              {errors.currentPassword && touched.currentPassword && (
                <Text style={styles.errorText}>{errors.currentPassword}</Text>
              )}
              <ProfileTextField
                placeholder={'New Password'}
                iconName={'lock'}
                value={values.newPassword}
                onChangeText={handleChange('newPassword')}
                onBlur={handleBlur('newPassword')}
                secureTextEntry={!visiblity.newPassword}
                autoCapitalize={'none'}
                autoCorrect={false}
                rightIcon={
                  <RightIcon
                    visible={visiblity.newPassword}
                    onPress={() =>
                      setVisibility({
                        ...visiblity,
                        newPassword: !visiblity.newPassword,
                      })
                    }
                  />
                }
              />
              {errors.newPassword && touched.newPassword && (
                <Text style={styles.errorText}>{errors.newPassword}</Text>
              )}
              <ProfileTextField
                placeholder={'Repeat Password'}
                iconName={'lock'}
                value={values.confirmNewPassword}
                onChangeText={handleChange('confirmNewPassword')}
                onBlur={handleBlur('confirmNewPassword')}
                secureTextEntry={!visiblity.confirmNewPassword}
                autoCapitalize={'none'}
                autoCorrect={false}
                rightIcon={
                  <RightIcon
                    visible={visiblity.confirmNewPassword}
                    onPress={() =>
                      setVisibility({
                        ...visiblity,
                        newPassword: !visiblity.confirmNewPassword,
                      })
                    }
                  />
                }
              />
              {errors.confirmNewPassword && touched.confirmNewPassword && (
                <Text style={styles.errorText}>
                  {errors.confirmNewPassword}
                </Text>
              )}
              <Pressable style={styles.saveButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Save</Text>
              </Pressable>
            </>
          )}
        </Formik>
      </View>
    </View>
  )
}

const getStyles = (theme, windowWidth) => {
  const tabletHeight = windowWidth >= 720 ? '5%' : '8%'
  const tabletPadding = windowWidth >= 720 ? '10%' : '5%'
  const webWidth = windowWidth >= 900 ? '60%' : '85%'

  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.backgroundPrimary,
      flex: 1,
      paddingHorizontal: Platform.select({
        ios: 0,
        android: 0,
        web: '25%',
      }),
    },
    contentSection: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    saveButton: {
      backgroundColor: theme.colors.primary200,
      padding: 18,
      borderRadius: 15,
    },
    buttonText: {
      textAlign: 'center',
      fontFamily: 'Inter-SemiBold',
      fontSize: 17,
    },
    errorText: {
      marginTop: -15,
      marginBottom: 10,
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

export default ChangePassword
