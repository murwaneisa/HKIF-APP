import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
  Image,
  ScrollView,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../../Styles/theme'
import { getFullUserInfoByID } from '../../Utilities/Axios/user'
import { FontAwesome } from '@expo/vector-icons'
import LoadingIndicator from '../../Components/LoadingIndicator'
import {
  convertToNormalWord,
  formatDate,
} from '../../Utilities/Helper/fomatWord'

const MemberDetails = ({ route }) => {
  const { userId } = route.params
  const [user, setUser] = useState(null)
  const [imageError, setImageError] = useState(false)
  const navigation = useNavigation()
  const windowWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, windowWidth)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fetchedUser = await getFullUserInfoByID(userId)
        console.log('user details', fetchedUser)
        setUser(fetchedUser)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [userId])
  const iconSize = Math.min(styles.image.width, styles.image.height)

  if (!user) {
    return <LoadingIndicator />
  }

  // Example usage
  const convertedRole = convertToNormalWord(user.role)
  const convertedMembType = convertToNormalWord(user.membershipType)

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View>
            {user.imageUrl && !imageError ? (
              <Image
                source={{ uri: user.imageUrl }}
                style={styles.image}
                onError={() => setImageError(true)}
              />
            ) : (
              <View style={styles.image}>
                <FontAwesome
                  name='user-circle'
                  size={iconSize}
                  color={theme.colors.text}
                />
              </View>
            )}
          </View>
          <View>
            <Text style={styles.name}>
              {`${user.firstName} ${user.lastName}`}
            </Text>
            <Text style={styles.text}>{convertedRole} </Text>
            <Text style={styles.text}>{convertedMembType}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <View style={styles.label}>
              <Text style={styles.labelName}>First name</Text>
            </View>
            <Text style={styles.infoItemText}>{user.firstName}</Text>
          </View>
          <View style={styles.infoItem}>
            <View style={styles.label}>
              <Text style={styles.labelName}>Last name </Text>
            </View>
            <Text style={styles.infoItemText}>{user.lastName}</Text>
          </View>
          <View style={styles.infoItem}>
            <View style={styles.label}>
              <Text style={styles.labelName}>Email</Text>
            </View>
            <Text style={styles.infoItemText}>{user.email}</Text>
          </View>
          <View style={styles.infoItem}>
            <View style={styles.label}>
              <Text style={styles.labelName}>Phone</Text>
            </View>
            <Text style={styles.infoItemText}>{user.phoneNumber}</Text>
          </View>
          <View style={styles.infoItem}>
            <View style={styles.label}>
              <Text style={styles.labelName}>Birth date</Text>
            </View>
            <Text style={styles.infoItemText}>
              {formatDate(user.birthDate)}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <View style={styles.label}>
              <Text style={styles.labelName}>Gender</Text>
            </View>
            <Text style={styles.infoItemText}>{user.gender}</Text>
          </View>
          <View style={styles.infoItem}>
            <View style={styles.label}>
              <Text style={styles.labelName}>Role</Text>
            </View>
            <Text style={styles.infoItemText}>{convertedRole}</Text>
          </View>
          <View style={styles.infoItem}>
            <View style={styles.label}>
              <Text style={styles.labelName}>Nationality</Text>
            </View>
            <Text style={styles.infoItemText}>{user.nationality}</Text>
          </View>
          <View style={[styles.infoItem, { borderBottomWidth: 0 }]}>
            <View style={styles.label}>
              <Text style={styles.labelName}>City</Text>
            </View>
            <Text style={styles.infoItemText}>{user.address}</Text>
          </View>
        </View>
        <View style={styles.headerContainer}>
          <View
            style={{
              width: '100%',
              height: 30,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: 'red',
                fontFamily: 'Inter-SemiBold',
                fontSize: Platform.select({
                  ios: 18,
                  android: 16,
                }),
              }}
            >
              Delete user
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const getStyles = (theme, windowWidth) => {
  const tabletPadding = windowWidth >= 720 ? 15 : 0
  const webWidth = windowWidth >= 900 ? '60%' : '85%'
  return StyleSheet.create({
    scrollContainer: {
      backgroundColor: theme.colors.backgroundSecondary,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.colors.backgroundSecondary,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.accent2,
      borderRadius: 8,
      padding: 10,
      marginTop: 10,
      width: Platform.select({
        ios: '90%',
        android: '90%',
        web: webWidth,
      }),
    },
    infoContainer: {
      marginTop: 10,
      backgroundColor: theme.colors.accent2,
      borderRadius: 8,
      width: Platform.select({
        ios: '90%',
        android: '90%',
        web: webWidth,
      }),
    },
    infoItem: {
      flexDirection: 'row',
      padding: 10,
      marginTop: 4,
      borderBottomWidth: 1, // Add a bottom border
      borderBottomColor: '#e0e0e0',
      marginHorizontal: 10, // Set the color of the border
    },
    infoItemText: {
      color: theme.colors.text,
      fontFamily: 'Inter-SemiBold',
      fontWeight: 'bold',
      marginLeft: 10,
      fontSize: Platform.select({
        ios: 16,
        android: 15,
        web: 16,
      }),
    },
    label: {
      width: Platform.select({
        ios: '30%',
        android: '25%',
        web: '20%',
      }),
      marginRight: 2,
      justifyContent: 'flex-start', // Align content to the start
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 60,
      marginRight: 25,
    },
    details: {
      flex: 1,
      paddingLeft: Platform.select({
        ios: 0,
        android: tabletPadding,
        web: 12,
      }),
    },
    name: {
      fontFamily: 'Inter-SemiBold',
      fontWeight: 'bold',
      color: theme.colors.title,
      textAlign: 'center',
      fontSize: Platform.select({
        ios: 16,
        android: 14,
        web: 16,
      }),
    },
    labelName: {
      fontFamily: 'Inter-SemiBold',
      fontWeight: 'bold',
      color: theme.colors.title,
      textAlign: 'left',
      fontSize: Platform.select({
        ios: 16,
        android: 14,
        web: 16,
      }),
    },
    text: {
      color: theme.colors.text,
      fontFamily: 'Inter-SemiBold',
      textAlign: 'center',
      fontSize: Platform.select({
        ios: 14,
        android: 12,
        web: 16,
      }),
    },
    membership: {
      fontSize: 14,
      color: '#666',
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionButton: {
      marginLeft: Platform.select({
        ios: 10,
        android: 10,
        web: 15,
      }),
    },
    pressed: {
      opacity: 0.5,
    },
  })
}

export default MemberDetails
