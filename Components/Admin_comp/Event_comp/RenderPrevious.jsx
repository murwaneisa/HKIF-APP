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
import { AntDesign } from '@expo/vector-icons'

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
      address: 'Convention Center, 456 Technology ',
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
      address: 'Central Plaza, 321 Main St',
      date: '2023-10-05',
      startTime: '11:00 AM',
      imageUrl: 'https://source.unsplash.com/featured/?foodfair',
    },
    {
      title: 'Autumn Music Concert',
      address: 'Outdoor Amphitheater, 654 Elm St',
      date: '2023-11-15',
      startTime: '6:00 PM',
      imageUrl: 'https://source.unsplash.com/featured/?concert',
    },
  ]

  const renderHeader = () => (
    <View style={styles.titleContainer}>
      <Text style={styles.header}>5 Current Event</Text>
      <View style={styles.subtitleContainer}>
        <AntDesign name='pluscircleo' size={24} color={theme.colors.primary} />
        <Text style={styles.subHeader}>Add Event</Text>
      </View>
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
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader}
          data={events}
          renderItem={({ item, index }) => (
            <EventCard key={index} event={item} previous={true} />
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
      backgroundColor: theme.colors.background2,
      paddingBottom: 15,
    },
    titleContainer: {
      flexDirection: 'row',
      paddingHorizontal: tabletPadding, // This adds padding on the sides based on device width
      backgroundColor: theme.colors.background2,
      alignItems: 'flex-start', // This aligns children to the start along the cross axis
      justifyContent: 'space-between',
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
      fontFamily: 'Inter-SemiBold',
      fontSize: Platform.select({
        ios: 16,
        android: 14,
        web: 18,
      }),
      color: theme.colors.primary,
      marginLeft: 5,
    },
    subtitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  })
}

export default RenderCurrent
