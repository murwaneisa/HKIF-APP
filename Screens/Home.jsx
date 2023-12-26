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
import {
  fetchActivities,
  toggleActivityFavorite,
} from '../Utilities/Redux/Actions/activityActions'
import { fetchEvents } from '../Utilities/Redux/Actions/eventActions'
import LoadingIndicator from '../Components/LoadingIndicator'

function Home({ navigation }) {
  const { theme } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const styles = getStyles(theme, windowWidth)

  const currentUser = '6573c82961a72b4119925725'
  const events = useSelector(state => state.event.data || [])
  const activities = useSelector(state => state.activity.data || [])
  const loadingEvents = useSelector(state => state.event.loading)
  const loadingActivities = useSelector(state => state.activity.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchActivities())
    dispatch(fetchEvents())
  }, [dispatch])

  const handleFavoriteActivity = activity => {
    dispatch(toggleActivityFavorite(activity._id, currentUser))
  }

  return (
    <>
      {loadingEvents && loadingActivities ? (
        <LoadingIndicator />
      ) : (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.announcementWrapper}>
            <AnnouncementCard
              message={'Swimming is canceled today the fox is in the forest'}
            />
          </View>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Events</Text>
              <Pressable onPress={() => navigation.navigate('Events')}>
                <Text style={styles.viewAll}>View all</Text>
              </Pressable>
            </View>
            <View style={styles.events}>
              {Platform.OS === 'web'
                ? events
                    .slice(0, 2)
                    .map(event => (
                      <EventCard
                        key={event._id}
                        data={event}
                        onPress={() =>
                          navigation.navigate('EventDetails', { event: event })
                        }
                        webWidth={'49.4%'}
                      />
                    ))
                : events
                    .slice(0, 1)
                    .map(event => (
                      <EventCard
                        key={event._id}
                        data={event}
                        onPress={() =>
                          navigation.navigate('EventDetails', { event: event })
                        }
                      />
                    ))}
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
                      navigation.navigate('Activity', { activity: activity })
                    }
                    onPressFavorite={() => handleFavoriteActivity(activity)}
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
                      navigation.navigate('Activity', { activity: activity })
                    }
                    onPressFavorite={() => handleFavoriteActivity(activity)}
                  />
                ))}
            </View>
          </View>
        </ScrollView>
      )}
    </>
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
      flexDirection: Platform.select({
        web: 'row',
      }),
      justifyContent: Platform.select({
        web: 'space-between',
      }),
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
