import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '../../../Styles/theme'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const AdminCard = ({ info }) => {
  const windowWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, windowWidth)
  const navigation = useNavigation()
  const [admin, setAdmin] = useState('Superadmin')

  const handleViewPress = () => {
    if (admin !== 'Superadmin') {
      //alert your not  a super admin
      return
    }

    navigation.navigate('AddAdmin', { leaderId: 'leader' }) // Replace 'MemberDetails' with your actual route name
  }
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View>
          <Image source={{ uri: info.image }} style={styles.image} />
        </View>
        <View style={styles.details}>
          <Text style={styles.name}>{info.name}</Text>
          <View style={styles.rolesContainer}>
            {info.roles.map(role => (
              <Text key={role} style={styles.text}>
                {role}
              </Text>
            ))}
          </View>
          <Text style={styles.text}>{info.phone}</Text>
          <Text style={styles.text}>{info.email}</Text>
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
