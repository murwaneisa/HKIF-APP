import React from 'react'
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native'
import { useTheme } from '../Styles/theme'
import EventCard from '../Components/EventCard'
import ActivityCard from '../Components/ActivityCard'
import AnnouncementCard from '../Components/AnnouncementCard'

const data = [
  { key: '1', title: 'Strength', favorite: true, icon: 'basketball' },
  { key: '2', title: 'Tennis', favorite: true, icon: 'tennisball' },
  { key: '3', title: 'Chess', favorite: true, icon: 'american-football' },
  { key: '4', title: 'Football', favorite: false, icon: 'ios-football' },
  { key: '5', title: 'Swimming', favorite: false, icon: 'bug' },
  { key: '6', title: 'Running', favorite: false, icon: 'game-controller' },
  { key: '7', title: 'Salsa', favorite: false, icon: 'body' },
]

function Home({ navigation }) {
  const { theme } = useTheme()
  const styles = getStyles(theme)

  return (
    <ScrollView style={styles.container}>
      <View style={styles.announcementWrapper}>
        <AnnouncementCard
          message={'Swimming is canceled today the fox is in the forest'}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Upcoming Event</Text>
        <View style={styles.events}>
          <EventCard />
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Favorites</Text>
        <View style={styles.activities}>
          {data
            .filter(act => act.favorite === true)
            .map(item => (
              <ActivityCard
                key={item.key}
                title={item.title}
                favorite={item.favorite}
                icon={item.icon}
                onPress={() => navigation.navigate('Activity')}
              />
            ))}
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Activities</Text>
        <View style={styles.activities}>
          {data
            .filter(act => act.favorite === false)
            .map(item => (
              <ActivityCard
                key={item.key}
                title={item.title}
                favorite={item.favorite}
                icon={item.icon}
                onPress={() => navigation.navigate('Activity')}
              />
            ))}
        </View>
      </View>
    </ScrollView>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      // backgroundColor
    },
    announcementWrapper: {
      marginHorizontal: 20,
      marginVertical: 20,
    },
    sectionContainer: {
      marginBottom: 10,
    },
    sectionTitle: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 20,
      marginBottom: 15,
      paddingHorizontal: 20,
    },
    events: {
      paddingHorizontal: 20,
    },
    activities: {
      marginHorizontal: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  })

export default Home
