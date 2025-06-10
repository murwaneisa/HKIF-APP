import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
  Platform,
} from 'react-native'
import React, { useState } from 'react'

import { Feather } from '@expo/vector-icons'
import UserInfoCard from '../Components/Profile/UserInfoCard'
import HKIFImagePicker from '../Utilities/Helper/HKIFImagePicker'
import { useSelector } from 'react-redux'

const Profile = ({ navigation }) => {
 
  const windowWidth = Dimensions.get('window').width
  const styles = getStyles( windowWidth)
  const [image, setImage] = useState(null)
  const currentUser = useSelector(state => state.user.currentUser)

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

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Pressable style={styles.imageContainer} onPress={handlePickImage}>
          <Image
            style={styles.image}
            source={{
              uri: image,
            }}
            resizeMode='cover'
          />
          <View style={styles.editIconWrapper}>
            <Feather name='edit' style={styles.editIcon} />
          </View>
        </Pressable>
        <Text style={styles.title}>
          {currentUser?.firstName} {currentUser?.lastName}
        </Text>
      </View>
      <View style={styles.contentSection}>
        <UserInfoCard
          iconName={'user'}
          text={`${currentUser?.firstName} ${currentUser?.lastName}`}
          onPress={() => {
            navigation.navigate('EditProfile', { type: 'Name' })
          }}
        />
        <UserInfoCard
          iconName={'mail'}
          text={currentUser?.email}
          onPress={() => {
            navigation.navigate('EditProfile', { type: 'Email' })
          }}
        />
        <UserInfoCard
          iconName={'map-pin'}
          text={currentUser?.address}
          onPress={() => {
            navigation.navigate('EditProfile', { type: 'Address' })
          }}
        />
        <UserInfoCard
          iconName={'phone'}
          text={currentUser?.phoneNumber}
          onPress={() => {
            navigation.navigate('EditProfile', { type: 'Phone' })
          }}
        />
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
      backgroundColor: 'green',
      flex: 1,
      paddingHorizontal: Platform.select({
        ios: 0,
        android: 0,
        web: '25%',
      }),
    },
    headerSection: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 25,
      paddingBottom: 25,
      borderBottomWidth: 1,
      borderBottomColor: 'green',
    },
    imageContainer: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      width: 120,
      height: 120,
      borderRadius: 120,
      marginBottom: 15,
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 120,
    },
    editIconWrapper: {
      position: 'absolute',
      right: 1,
      bottom: 1,
      backgroundColor: 'gray',
      padding: 8,
      borderRadius: 40,
      borderWidth: 4,
      borderColor: 'green',
    },
    editIcon: {
      fontSize: 16,
      color: '#6B6B6B',
    },
    title: {
      color: '#6B6B6B',
      fontSize: 20,
      fontFamily: 'Inter-Bold',
    },
    contentSection: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
  })
}

export default Profile
