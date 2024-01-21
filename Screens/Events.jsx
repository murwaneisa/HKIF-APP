import React, { useEffect, useMemo } from 'react'
import { View, StyleSheet, FlatList, Platform } from 'react-native'
import { useTheme } from '../Styles/theme'
import EventCard from '../Components/Event/EventCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents } from '../Utilities/Redux/Actions/eventActions'
import LoadingIndicator from '../Components/LoadingIndicator'

function Events({ navigation }) {
  const { theme } = useTheme()
  const styles = getStyles(theme)

  const events = useSelector(state => state.event.data || [])
  const loadingEvents = useSelector(state => state.event.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  return (
    <>
      {loadingEvents ? (
        <LoadingIndicator />
      ) : (
        <View style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={events}
            renderItem={({ item }) => (
              <EventCard
                data={item}
                onPress={() =>
                  navigation.navigate('EventDetails', { event: item })
                }
                webWidth={'100%'}
                marginBottom={20}
              />
            )}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.contentContainerStyle}
          />
        </View>
      )}
    </>
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
        web: '25%',
      }),
    },
    contentContainerStyle: {
      paddingTop: 20,
      paddingHorizontal: Platform.select({
        web: 20,
      }),
    },
  })

export default Events
