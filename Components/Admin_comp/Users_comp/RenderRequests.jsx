import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
  FlatList,
} from 'react-native'
import React from 'react'
import RequestCard from './RequetCard'
import { useTheme } from '../../../Styles/theme'

const RenderRequests = () => {
  const windowWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, windowWidth)

  const users = [
    {
      name: 'Elena Gilbert',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      membership: 'Full Membership',
      phone: '+1234567890',
      date: '2023-01-15',
    },
    {
      name: 'Damon Salvatore',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      membership: 'Membership',
      phone: '+1234567891',
      date: '2023-02-20',
    },
    {
      name: 'Caroline Forbes',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      membership: 'Full Membership',
      phone: '+1234567892',
      date: '2023-03-25',
    },
    {
      name: 'Stefan Salvatore',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      membership: 'Membership',
      phone: '+1234567893',
      date: '2023-04-30',
    },
    {
      name: 'Klaus Mikaelson',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      membership: 'Membership',
      phone: '+1234567895',
      date: '2023-06-10',
    },
    {
      name: 'Rebekah Mikaelson',
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
      membership: 'Full Membership',
      phone: '+1234567896',
      date: '2023-07-15',
    },
    {
      name: 'Rebekah Mikaelson',
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
      membership: 'Full Membership',
      phone: '+1234567896',
      date: '2023-07-15',
    },
    {
      name: 'Rebekah Mikaelson',
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
      membership: 'Full Membership',
      phone: '+1234567896',
      date: '2023-07-15',
    },
  ]
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.header}>Pending Requests</Text>
        <Text style={styles.subHeader}>
          Approve the member's payment with Swish
        </Text>
      </View>
      {Platform.OS == 'web' ? (
        <View style={styles.container}>
          {users.map((user, index) => (
            <RequestCard key={index} user={user} />
          ))}
        </View>
      ) : (
        <FlatList
          data={users}
          renderItem={({ item, index }) => (
            <RequestCard key={index} user={item} />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.container}
        />
      )}
    </>
  )
}
const getStyles = (theme, windowWidth) => {
  const tabletPadding = windowWidth >= 720 ? 15 : 0
  const webWidth = windowWidth >= 900 ? '60%' : '85%'
  return StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: theme.colors.background2,

      alignItems: Platform.select({
        android: 'center',
        ios: 'center',
      }),
    },
    titleContainer: {
      /*     borderWidth: 2,
      borderColor: 'red', */
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
      fontFamily: 'Inter-Bold',
      fontSize: Platform.select({
        ios: 18,
        android: 16,
        web: 25,
      }),
      paddingBottom: 2,
      color: theme.colors.text2,
    },
    subHeader: {
      fontFamily: 'Inter-Regular',
      fontSize: Platform.select({
        ios: 16,
        android: 14,
        web: 18,
      }),
      color: theme.colors.text,
      marginBottom: 8,
    },
  })
}

export default RenderRequests
