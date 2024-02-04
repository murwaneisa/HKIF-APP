import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '../../../Styles/theme'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const AdminCard = ({ info, adminType }) => {
  const windowWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, windowWidth)
  const navigation = useNavigation()

  // Access info properties safely here
  const { firstName, lastName, role, phoneNumber, email } = info

  const image = 'https://randomuser.me/api/portraits/women/4.jpg'

  const handleViewPress = () => {
    if (!adminType) {
      //alert your not  a super admin
      Alert.alert(
        'Access Denied', // Title of the alert
        'You do not have permission to view this section.', // Message of the alert
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }, // Button to dismiss the alert
        ]
      )
      return null
    }

    navigation.navigate('AddAdmin', { leaderId: 'leader' }) // Replace 'MemberDetails' with your actual route name
  }
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
        <View style={styles.details}>
          <Text style={styles.name}> {`${firstName} ${lastName}`}</Text>
          <View style={styles.rolesContainer}>
            {role.map(role => (
              <Text key={role} style={styles.text}>
                {role}
              </Text>
            ))}
          </View>
          <Text style={styles.text}>{phoneNumber}</Text>
          <Text style={styles.text}>{email}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleViewPress}
          >
            <Text style={styles.viewText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
const getStyles = (theme, windowWidth) => {
  const tabletPadding = windowWidth >= 720 ? 15 : 0
  const webWidth = windowWidth >= 900 ? '60%' : '85%'
  return StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: theme.colors.backgroundSecondary,
      alignItems: 'center',
      marginTop: 10,
    },
    cardContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.accent2,
      borderRadius: 8,
      padding: 10,
      width: Platform.select({
        ios: '100%',
        android: '100%',
        web: webWidth,
      }),
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 45,
      marginRight: 10,
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
      fontSize: Platform.select({
        ios: 16,
        android: 14,
        web: 16,
      }),
    },
    rolesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      // Adjust padding and alignment as needed
    },
    text: {
      color: theme.colors.text,
      fontFamily: 'Inter-SemiBold',
      paddingTop: Platform.select({
        ios: 2,
        android: 1,
        web: 2,
      }),
      fontSize: Platform.select({
        ios: 14,
        android: 12,
        web: 16,
      }),
    },
    viewText: {
      color: theme.colors.primary,
      fontFamily: 'Inter-SemiBold',
      fontWeight: 'bold',
      fontSize: Platform.select({
        ios: 16,
        android: 15,
        web: 16,
      }),
    },

    pressed: {
      opacity: 0.5,
    },
  })
}
export default AdminCard
