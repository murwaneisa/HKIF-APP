import React, { useEffect } from 'react'
import {
  View,
  Text,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native'
import EventCard from '../Components/Event/EventCard'
import ActivityCard from '../Components/Activity/ActivityCard'
import AnnouncementCard from '../Components/AnnouncementCard'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchActivities,
  toggleActivityFavorite,
} from '../Utilities/Redux/Actions/activityActions'
import { fetchEvents } from '../Utilities/Redux/Actions/eventActions'
import LoadingIndicator from '../Components/LoadingIndicator'
import { fetchActivitiesLeaders } from '../Utilities/Redux/Actions/leaderActionl'

function Home({ navigation }) {
  const currentUser = '6573c82961a72b4119925725'
  const events = useSelector(state => state.event.data || [])
  const activities = useSelector(state => state.activity.data || [])
  const loadingEvents = useSelector(state => state.event.loading)
  const loadingActivities = useSelector(state => state.activity.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchActivities())
    dispatch(fetchEvents())
    dispatch(fetchActivitiesLeaders())
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
          className="bg-background-primary px-5 pt-5 web:px-[20%] web:pt-10"
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-4 web:mb-6">
            <AnnouncementCard
              message={'Swimming is canceled today the fox is in the forest'}
            />
          </View>

          {events.length === 0 ? null : (
            <View className="mb-4 web:mb-6">
              <View className="flex-row justify-between items-center mb-4 web:mb-[17px]">
                <Text className="font-['Inter-Bold'] text-lg android:text-lg web:text-[22px] text-text-title">
                  Upcoming Events
                </Text>
                <Pressable onPress={() => navigation.navigate('Events')}>
                  <Text className="font-['Inter-SemiBold'] text-sm web:text-lg text-primary">
                    View all
                  </Text>
                </Pressable>
              </View>
              <View className="web:flex-row web:justify-between w-full">
                {Platform.OS === 'web'
                  ? events.slice(0, 2).map(event => (
                      <EventCard
                        key={event._id}
                        data={event}
                        onPress={() =>
                          navigation.navigate('EventDetails', {
                            event: event,
                          })
                        }
                        webWidth={'49.4%'}
                      />
                    ))
                  : events.slice(0, 1).map(event => (
                      <EventCard
                        key={event._id}
                        data={event}
                        onPress={() =>
                          navigation.navigate('EventDetails', {
                            event: event,
                          })
                        }
                      />
                    ))}
              </View>
            </View>
          )}

          {activities.filter(act => act.membersIds.includes(currentUser))
            .length === 0 ? null : (
            <View className="mb-4 web:mb-6">
              <Text className="font-['Inter-Bold'] text-lg android:text-lg web:text-[22px] text-text-title px-5">
                Favorites
              </Text>
              <View className="flex-row flex-wrap mx-4">
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
          )}

          {activities.filter(act => !act.membersIds.includes(currentUser))
            .length === 0 ? null : (
            <View className="mb-[60px]">
              <Text className="font-['Inter-Bold'] text-lg android:text-lg web:text-[22px] text-text-title px-5">
                Activities
              </Text>
              <View className="flex-row flex-wrap mx-4">
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
          )}
        </ScrollView>
      )}
    </>
  )
}

export default Home
