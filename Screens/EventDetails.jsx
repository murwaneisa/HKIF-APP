import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native'
import { useTheme } from '../Styles/theme'
import { Ionicons } from '@expo/vector-icons'
import BenefitCard from '../Components/Event/BenefitCard'
import JoinEventCard from '../Components/Event/JoinEventCard'
import UserCard from '../Components/UserCard'
import { useRoute } from '@react-navigation/native'
import { getPublicUsersByID } from '../Utilities/Axios/user'
import LoadingIndicator from '../Components/LoadingIndicator'
import DateFormatter from '../Utilities/Helper/DateFormatter'

function EventDetails({ navigation }) {
  const { theme } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const styles = getStyles(theme, windowWidth, windowHeight)

  const route = useRoute()
  const event = route.params.event
  const [attendees, setAttendees] = useState([])
  const [loadingAttendees, setLoadingAttendees] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoadingAttendees(true)
      const data = await getPublicUsersByID(event.attendeesIds)
      setLoadingAttendees(false)
      setAttendees(data)
    }
    fetchData()
  }, [event.attendeesIds])

  const renderFooter = () => {
    return loadingAttendees ? (
      <LoadingIndicator />
    ) : (
      <View style={{ marginBottom: 110 }} />
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.headerComponent}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: event.imageUrl,
                }}
                resizeMode='cover'
              />
            </View>
            <View style={styles.headerSection}>
              <View style={styles.headerInfoWrapper}>
                <Text style={styles.title}>{event.title}</Text>
                <View style={styles.textWrapper}>
                  <Ionicons name='location' style={styles.icon} />
                  <Text style={styles.addressText}>Högskolan Kristianstad</Text>
                </View>
              </View>

              <View style={styles.dateInfoWrapper}>
                <View style={styles.textWrapper}>
                  <Ionicons name='calendar' style={styles.icon} />
                  <Text style={styles.dateText}>
                    {DateFormatter.formatDate(event.startTime)}
                  </Text>
                </View>
                <View style={styles.textWrapper}>
                  <Ionicons name='time' style={styles.icon} />
                  <Text style={styles.dateText}>
                    {DateFormatter.formatTime(event.startTime)} -{' '}
                    {DateFormatter.formatTime(event.endTime)}
                  </Text>
                </View>
              </View>

              <View style={styles.benefitsList}>
                {event.benefits.map((benefit, index) => (
                  <BenefitCard key={index} title={benefit} />
                ))}
              </View>
            </View>
            {Platform.OS === 'web' ? (
              <JoinEventCard
                title={`Price: ${event.price} SEK`}
                buttonTitle={'Join Event'}
                containerStyle={styles.joinEventCard}
                onPress={() => {}}
              />
            ) : null}
            <View style={styles.descriptionSection}>
              <Text style={styles.descriptionText}>{event.description}</Text>
            </View>

            {!loadingAttendees && attendees.length === 0 ? null : (
              <View style={styles.usersSectionHeader}>
                <Text style={styles.sectionTitle}>People who've joined</Text>
                <Pressable
                  onPress={() =>
                    navigation.navigate('EventUsers', { attendees: attendees })
                  }
                >
                  <Text style={styles.viewAll}>View all</Text>
                </Pressable>
              </View>
            )}
          </View>
        }
        data={attendees}
        renderItem={({ item }) => <UserCard user={item} />}
        keyExtractor={i => i.firstName.toString().concat(i.lastName.toString())}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
      />

      {Platform.OS === 'android' || Platform.OS === 'ios' ? (
        <JoinEventCard
          title={`Price: ${event.price} SEK`}
          buttonTitle={'Join Event'}
          containerStyle={styles.joinEventCardBottom}
          onPress={() => {}}
        />
      ) : null}
    </View>
  )
}

const getStyles = (theme, windowWidth, windowHeight) => {
  const tabletHeight = windowWidth >= 720 ? '5%' : '8%'
  const tabletPadding = windowWidth >= 720 ? '10%' : '5%'
  const webWidth = windowWidth >= 900 ? '60%' : '85%'

  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.backgroundPrimary,
      flex: 1,
      paddingHorizontal: Platform.select({
        ios: 0,
        android: 0,
        web: '20%',
      }),
    },
    headerComponent: {
      padding: 20,
    },
    imageContainer: {
      width: '100%',
      height: Platform.select({
        ios: 225,
        android: 225,
        web: 450,
      }),
      borderRadius: 25,
      marginBottom: 15,
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 25,
    },
    headerSection: {
      marginBottom: 20,
    },
    headerInfoWrapper: {
      marginBottom: 15,
    },
    dateInfoWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    textWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      color: theme.colors.primary,
      fontSize: 17,
      marginRight: 4,
    },
    title: {
      fontFamily: 'Inter-Bold',
      fontSize: 24,
      marginBottom: 7,
      color: theme.colors.title,
    },
    addressText: {
      fontFamily: 'Inter-Regular',
      fontSize: 15,
      color: theme.colors.text,
    },
    dateText: {
      fontFamily: 'Inter-Regular',
      fontSize: 15,
      color: theme.colors.text,
    },
    benefitsList: {
      flexDirection: 'row',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderColor: theme.colors.border,
      marginTop: 4,
    },
    descriptionSection: {
      marginBottom: 25,
    },
    descriptionText: {
      fontFamily: 'Inter-Regular',
      fontSize: 17,
      lineHeight: 22,
      color: theme.colors.text,
    },
    usersSectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    sectionTitle: {
      fontFamily: 'Inter-Bold',
      fontSize: 20,
      color: theme.colors.title,
    },
    viewAll: {
      color: theme.colors.primary,
      fontFamily: 'Inter-SemiBold',
      fontSize: 14,
    },
    joinEventCard: {
      marginBottom: 20,
    },
    joinEventCardBottom: {
      position: 'absolute',
      left: Platform.select({
        ios: 20,
        android: 20,
        web: '20%',
      }),
      right: Platform.select({
        ios: 20,
        android: 20,
        web: '20%',
      }),
      bottom: 20,
    },
  })
}

export default EventDetails
