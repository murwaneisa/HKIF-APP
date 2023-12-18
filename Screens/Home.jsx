import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native'
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
  { key: '8', title: 'Football', favorite: false, icon: 'ios-football' },
  { key: '9', title: 'Swimming', favorite: false, icon: 'bug' },
  { key: '10', title: 'Running', favorite: false, icon: 'game-controller' },
  { key: '11', title: 'Salsa', favorite: false, icon: 'body' },
]

function Home({ navigation }) {
  const { theme } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const styles = getStyles(theme, windowWidth)

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.announcementWrapper}>
        <AnnouncementCard
          message={'Swimming is canceled today the fox is in the forest'}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Upcoming Event</Text>
        <View style={styles.events}>
          <EventCard onPress={() => navigation.navigate('Event')} />
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitleFavorites}>Favorites</Text>
        <View style={styles.activities}>
          {data
            .filter(act => act.favorite === true)
            .map(item => (
              <ActivityCard
                key={item.key}
                title={item.title}
                favorite={item.favorite}
                icon={item.icon}
                onPress={() =>
                  navigation.navigate('Activity', { title: item.title })
                }
              />
            ))}
        </View>
      </View>
      <View style={[styles.sectionContainer, { marginBottom: 60 }]}>
        <Text style={styles.sectionTitleFavorites}>Activities</Text>
        <View style={styles.activities}>
          {data
            .filter(act => act.favorite === false)
            .map(item => (
              <ActivityCard
                key={item.key}
                title={item.title}
                favorite={item.favorite}
                icon={item.icon}
                onPress={() =>
                  navigation.navigate('Activity', { title: item.title })
                }
              />
            ))}
        </View>
      </View>
    </ScrollView>
  )
}

const getStyles = (theme, windowWidth) => {
  const tabletHeight = windowWidth >= 720 ? '5%' : '8%'
  const tabletPadding = windowWidth >= 720 ? '10%' : '5%'
  const webWidth = windowWidth >= 900 ? '60%' : '85%'

  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.backgroundPrimary,
      paddingHorizontal: Platform.select({
        ios: 0,
        android: 0,
        web: '20%',
      }),
      paddingTop: Platform.select({
        ios: 20,
        android: 20,
        web: 40,
      }),
    },
    announcementWrapper: {
      marginHorizontal: 20,
      marginBottom: Platform.select({
        ios: 15,
        android: 15,
        web: 25,
      }),
    },
    sectionContainer: {
      marginBottom: Platform.select({
        ios: 15,
        android: 13,
        web: 25,
      }),
    },
    sectionTitle: {
      fontFamily: 'Inter-Bold',
      fontSize: Platform.select({
        ios: 20,
        android: 18,
        web: 22,
      }),
      marginBottom: Platform.select({
        ios: 15,
        android: 15,
        web: 20,
      }),
      paddingHorizontal: 20,
      color: theme.colors.text,
    },
    sectionTitleFavorites: {
      fontFamily: 'Inter-Bold',
      fontSize: Platform.select({
        ios: 20,
        android: 18,
        web: 22,
      }),
      paddingHorizontal: 20,
      color: theme.colors.text,
    },
    events: {
      width: '100%',
      paddingHorizontal: 20,
    },
    activities: {
      marginHorizontal: Platform.select({
        ios: 15,
        android: 15,
        web: 10,
      }),
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  })
}

export default Home
