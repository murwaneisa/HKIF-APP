import React, { useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native'
import { useTheme } from '../Styles/theme'
import EventCard from '../Components/EventCard'
import ActivityCard from '../Components/ActivityCard'
import AnnouncementCard from '../Components/AnnouncementCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchActivities } from '../Utilities/Redux/Actions/activityActions'

function Home({ navigation }) {
  const { theme } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const styles = getStyles(theme, windowWidth)

  const currentUser = '6522c9aa889e288bfa25d7cd'
  const activities = useSelector(state => state.activity.data || [])
  const loading = useSelector(state => state.activity.loading)
  const error = useSelector(state => state.activity.error)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchActivities())
    console.log(currentUser)
  }, [dispatch])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.announcementWrapper}>
        <AnnouncementCard
          message={'Swimming is canceled today the fox is in the forest'}
        />
      </View>
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Event</Text>
          <Pressable onPress={() => navigation.navigate('Events')}>
            <Text style={styles.viewAll}>View all</Text>
          </Pressable>
        </View>
        <View style={styles.events}>
          <EventCard onPress={() => navigation.navigate('Event')} />
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitleFavorites}>Favorites</Text>
        <View style={styles.activities}>
          {activities
            .filter(act => act.membersIds.includes(currentUser))
            .map(activity => (
              <ActivityCard
                key={activity._id}
                title={activity.title}
                favorite={activity.membersIds.includes(currentUser)}
                icon={'basketball'}
                onPress={() =>
                  navigation.navigate('Activity', { title: activity.title })
                }
              />
            ))}
        </View>
      </View>
      <View style={[styles.sectionContainer, { marginBottom: 60 }]}>
        <Text style={styles.sectionTitleFavorites}>Activities</Text>
        <View style={styles.activities}>
          {activities
            .filter(act => !act.membersIds.includes(currentUser))
            .map(activity => (
              <ActivityCard
                key={activity._id}
                title={activity.title}
                favorite={activity.membersIds.includes(currentUser)}
                icon={'football'}
                onPress={() =>
                  navigation.navigate('Activity', { title: activity.title })
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
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 20,
      marginBottom: Platform.select({
        ios: 15,
        android: 15,
        web: 17,
      }),
    },
    sectionTitle: {
      fontFamily: 'Inter-Bold',
      fontSize: Platform.select({
        ios: 20,
        android: 18,
        web: 22,
      }),
      color: theme.colors.text,
    },
    viewAll: {
      color: theme.colors.primary,
      fontFamily: 'Inter-SemiBold',
      fontSize: Platform.select({
        ios: 14,
        android: 14,
        web: 18,
      }),
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
