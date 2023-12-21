import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native'
import React from 'react'
import { useTheme } from '../Styles/theme'
import { Feather } from '@expo/vector-icons'
import UserInfoCard from '../Components/UserInfoCard'

const Profile = ({ navigation }) => {
  const { theme } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const styles = getStyles(theme, windowWidth)

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://images.unsplash.com/photo-1513635625218-6956bc843133?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vdGJhbGwlMjBpbiUyMHNwb3J0JTIwaGFsbHxlbnwwfHwwfHx8MA%3D%3D',
            }}
            resizeMode='cover'
          />
        </View>
        <Text style={styles.title}>Ahmed Mohammed</Text>
      </View>
      <View style={styles.contentSection}>
        <UserInfoCard
          iconName={'user'}
          text={'Ahmed Mohammed'}
          onPress={() => {
            navigation.navigate('EditProfile', { type: 'Name' })
          }}
        />
        <UserInfoCard
          iconName={'mail'}
          text={'a23134@gmail.com'}
          onPress={() => {
            navigation.navigate('EditProfile', { type: 'Email' })
          }}
        />
        <UserInfoCard
          iconName={'map-pin'}
          text={'Olastorpsvägen 38, 391 29, Kristianstad asdfdsaf'}
          onPress={() => {
            navigation.navigate('EditProfile', { type: 'Address' })
          }}
        />
        <UserInfoCard
          iconName={'phone'}
          text={'070022442214'}
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
      backgroundColor: theme.colors.backgroundPrimary,
      flex: 1,
    },
    headerSection: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 25,
      paddingBottom: 25,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    imageContainer: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      width: 120,
      height: 120,
      borderRadius: 120,
      marginBottom: 15,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 120,
    },
    title: {
      color: theme.colors.text,
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
