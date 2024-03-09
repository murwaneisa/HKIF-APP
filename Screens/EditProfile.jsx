import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTheme } from '../Styles/theme'
<<<<<<< HEAD
=======
import { useDispatch } from 'react-redux'
import { updateAndSetUserInfo } from '../Utilities/Redux/Actions/userActions'
>>>>>>> main
import ProfileTextField from '../Components/Profile/ProfileTextField'

const EditProfile = ({ route }) => {
  const { theme } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const styles = getStyles(theme, windowWidth)
  const { type } = route.params
  const dispatch = useDispatch()

  // Retrieve currentUser from Redux state
  const currentUser = useSelector(state => state.user.currentUser)

  // Initialize userInfo state with currentUser info if available
  const [userInfo, setUserInfo] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    address: currentUser?.address || '',
    city: currentUser?.city || '',
    zipCode: currentUser?.zipCode || '',
    phoneNumber: currentUser?.phoneNumber || '',
  })

  let inputComponents

  switch (type) {
    case 'Name':
      inputComponents = (
        <>
          <ProfileTextField
            placeholder={'First Name'}
            iconName={'user'}
            value={userInfo.firstName}
            onChangeText={text => setUserInfo({ ...userInfo, firstName: text })}
          />
          <ProfileTextField
            placeholder={'Last Name'}
            iconName={'user'}
            value={userInfo.lastName}
            onChangeText={text => setUserInfo({ ...userInfo, lastName: text })}
          />
        </>
      )
      break
    case 'Email':
      inputComponents = (
        <ProfileTextField
          placeholder={'Email address'}
          iconName={'mail'}
          value={userInfo.email}
          onChangeText={text => setUserInfo({ ...userInfo, email: text })}
          keyboardType={'email-address'}
        />
      )
      break
    case 'Address':
      inputComponents = (
        <>
          <ProfileTextField
            placeholder={'Address'}
            iconName={'map-pin'}
            value={userInfo.address}
            onChangeText={text => setUserInfo({ ...userInfo, address: text })}
          />
          <ProfileTextField
            placeholder={'City'}
            iconName={'map-pin'}
            value={userInfo.city}
            onChangeText={text => setUserInfo({ ...userInfo, city: text })}
          />
          <ProfileTextField
            placeholder={'Zip Code'}
            iconName={'map-pin'}
            value={userInfo.zipCode}
            onChangeText={text => setUserInfo({ ...userInfo, zipCode: text })}
          />
        </>
      )
      break
    case 'Phone':
      inputComponents = (
        <ProfileTextField
          placeholder={'Phone Number'}
          iconName={'phone'}
          value={userInfo.phoneNumber}
          onChangeText={text => setUserInfo({ ...userInfo, phoneNumber: text })}
          keyboardType={'numeric'}
        />
      )
      break
  }

  const handleSave = () => {
    console.log('Saving userInfo:', userInfo)
    dispatch(updateAndSetUserInfo(currentUser._id, userInfo))
    if (type === 'Name') {
      if (userInfo.firstName.trim() === '' || userInfo.lastName.trim() === '') {
        console.log('field cannot be empty')
        return
      }
      console.log('Saved:', userInfo.firstName + ' ' + userInfo.lastName)
    } else if (type === 'Email') {
      if (userInfo.email.trim() === '') {
        console.log('field cannot be empty')
        return
      }
      console.log('Saved:', userInfo.email)
    } else if (type === 'Address') {
      if (
        userInfo.address.trim() === '' ||
        userInfo.city.trim() === '' ||
        userInfo.zipCode.trim() === ''
      ) {
        console.log('field cannot be empty')
        return
      }
      console.log(
        'Saved:',
        userInfo.address + ' ' + userInfo.city + ' ' + userInfo.zipCode
      )
    } else if (type === 'Phone') {
      if (userInfo.phoneNumber.trim() === '') {
        console.log('field cannot be empty')
        return
      }
      console.log('Saved:', userInfo.phoneNumber)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentSection}>
        {inputComponents}
        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
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
  })
}

export default EditProfile
