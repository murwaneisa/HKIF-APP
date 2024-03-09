import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTheme } from '../../../Styles/theme'
import EventCard from './EventCard'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents } from '../../../Utilities/Redux/Actions/eventActions'

const RenderCurrent = () => {
  const navigation = useNavigation()
  const windowWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, windowWidth)
  const dispatch = useDispatch()

  const allEvents = useSelector(state => state.event.data)

  useEffect(() => {
    dispatch(fetchEvents()) // Dispatch fetchEvents action on component mount
  }, [dispatch])

  const events = allEvents.filter(event => {
    const eventDate = new Date(event.endTime)
    return eventDate >= new Date() // Assuming each event has a 'date' field
  })

  const renderHeader = () => (
    <View style={styles.titleContainer}>
      <Text style={styles.header}>({events.length}) Current Event</Text>
      <TouchableOpacity
        style={styles.subtitleContainer}
        onPress={() => navigation.navigate('AddEvent')}
      >
        <AntDesign name='pluscircleo' size={22} color={theme.colors.primary} />
        <Text style={styles.subHeader}>Add Event</Text>
      </TouchableOpacity>
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
      backgroundColor: theme.colors.backgroundSecondary,
      paddingBottom: 15,
    },
    titleContainer: {
      flexDirection: 'row',
      paddingHorizontal: tabletPadding, // This adds padding on the sides based on device width
      backgroundColor: theme.colors.backgroundSecondary,
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
      color: theme.colors.title,
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
