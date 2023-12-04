import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
  FlatList,
  ScrollView,
} from 'react-native'
import React from 'react'
import { useTheme } from '../../../Styles/theme'
import EventCard from './EventCard'

const RenderCurrent = () => {
  const windowWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, windowWidth)

  const events = [
    {
      title: 'Community Arts Festival',
      address: '123 Park Street, Downtown City',
      date: '2023-07-16',
      startTime: '10:00 AM',
      imageUrl: 'https://source.unsplash.com/featured/?festival',
    },
    {
      title: 'Tech Conference 2023',
      address: 'Convention Center, 456 Technology Rd, Tech City',
      date: '2023-08-21',
      startTime: '9:00 AM',
      imageUrl: 'https://source.unsplash.com/featured/?conference',
    },
    {
      title: 'Charity Marathon',
      address: '789 Riverside Avenue, Marathon City',
      date: '2023-09-10',
      startTime: '7:00 AM',
      imageUrl: 'https://source.unsplash.com/featured/?marathon',
    },
    {
      title: 'Local Food Fair',
      address: 'Central Plaza, 321 Main St, Foodville',
      date: '2023-10-05',
      startTime: '11:00 AM',
      imageUrl: 'https://source.unsplash.com/featured/?foodfair',
    },
    {
      title: 'Autumn Music Concert',
      address: 'Outdoor Amphitheater, 654 Elm St, Music Town',
      date: '2023-11-15',
      startTime: '6:00 PM',
      imageUrl: 'https://source.unsplash.com/featured/?concert',
    },
  ]

  const renderHeader = () => (
    <View style={styles.titleContainer}>
      <Text style={styles.header}>150 Current Members</Text>
      <Text style={styles.subHeader}>
        Click on view to show members's details
      </Text>
    </View>
  )

  return (
    <>
      {Platform.OS === 'web' ? (
        <View style={styles.container}>
          {renderHeader()}
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={renderHeader}
          data={events}
          renderItem={({ item, index }) => (
            <EventCard key={index} event={item} />
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
      backgroundColor: 'red',
      paddingBottom: 15,
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

export default RenderCurrent
