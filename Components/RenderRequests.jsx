import { View, Text, Dimensions, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { useTheme } from '../Styles/theme'
import UserRequest from './UserRequest'

const RenderRequests = () => {
  const windowWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, windowWidth)
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.header}>Pending Requests</Text>
        <Text style={styles.subHeader}>Approve the member's payment</Text>
      </View>
      <View>
        <UserRequest />
        <UserRequest />
        <UserRequest />
        <UserRequest />
        <UserRequest />
        <UserRequest />
        <UserRequest />
        <UserRequest />
        <UserRequest />
        <UserRequest />
        <UserRequest />
        <UserRequest />
        <UserRequest />
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
      backgroundColor: theme.colors.background2,
      marginTop: 10,
      alignItems: Platform.select({
        android: 'center',
        ios: 'center',
      }),
    },
    titleContainer: {
      borderWidth: 2,
      borderColor: 'red',
      width: Platform.select({
        ios: '90%',
        android: '90%',
        web: webWidth,
      }), // This ensures the titleContainer takes full width
      paddingHorizontal: tabletPadding, // This adds padding on the sides based on device width
      backgroundColor: theme.colors.background2,
      alignItems: 'flex-start', // This aligns children to the start along the cross axis
    },
    header: {
      fontWeight: 'bold',
      fontSize: 18,
      color: theme.colors.text2,
    },
    subHeader: {
      fontSize: 14,
      color: theme.colors.text,
      marginBottom: 20,
    },
  })
}

export default RenderRequests
