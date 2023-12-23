import React, { useMemo } from 'react'
import { View, StyleSheet, FlatList, Platform } from 'react-native'
import { useTheme } from '../Styles/theme'
import EventCard from '../Components/EventCard'

function Events({ navigation }) {
  const { theme } = useTheme()
  const styles = getStyles(theme)

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

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={events}
        renderItem={({ item }) => (
          <EventCard
            onPress={() => navigation.navigate('Event')}
            marginBottom={20}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.backgroundSecondary,
      flex: 1,
      paddingHorizontal: Platform.select({
        ios: 20,
        android: 20,
        web: '20%',
      }),
    },
    contentContainerStyle: {
      paddingTop: 20,
    },
  })

export default Events
