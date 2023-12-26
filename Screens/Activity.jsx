import React, { useRef, useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native'
import { useTheme } from '../Styles/theme'
import Calendar from '../Components/Calendar'
import NextActivitySessionCard from '../Components/NextActivitySessionCard'
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import UserCard from '../Components/UserCard'
import { useRoute } from '@react-navigation/native'
import { getPublicUsersByID } from '../Utilities/Axios/user'
import LoadingIndicator from '../Components/LoadingIndicator'

function Activity({ navigation }) {
  const sheetRef = useRef(null)
  const { theme } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const styles = getStyles(theme, windowWidth)

  const route = useRoute()
  const activity = route.params.activity
  const [members, setMembers] = useState([])
  const [loadingMembers, setLoadingMembers] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoadingMembers(true)
      const data = await getPublicUsersByID(activity.membersIds)
      setLoadingMembers(false)
      setMembers(data)
    }
    fetchData()
  }, [activity.membersIds])

  let Swiper

  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    Swiper = require('react-native-swiper').default
  } else {
    Swiper = undefined
  }

  const getISOWeek = date => {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    d.setDate(d.getDate() + 4 - (d.getDay() || 7))
    const yearStart = new Date(d.getFullYear(), 0, 1)
    const weekNumber = Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
    return weekNumber
  }

  const formatDate = date => {
    const weekNumber = getISOWeek(date)
    return `Week ${weekNumber}`
  }

  const weeks = Array.from({ length: 4 }, (_, index) => {
    const date = new Date(new Date())
    date.setDate(new Date().getDate() + index * 7)
    return date
  })

  const renderFooter = () => {
    return loadingMembers ? <LoadingIndicator /> : null
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: activity.imageUrl,
            }}
            resizeMode='cover'
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <NextActivitySessionCard />
        </View>

        {Platform.OS === 'android' || Platform.OS === 'ios' ? (
          <View style={styles.calendarSection}>
            <Swiper
              style={styles.swiper}
              paginationStyle={styles.pagination}
              activeDotColor={theme.colors.primary}
              dotColor={theme.colors.secondary}
            >
              {weeks.map((item, index) => (
                <View style={styles.slide} key={index}>
                  <Text style={styles.sectionTitle}>
                    Schedule - {formatDate(item)}
                  </Text>
                  <Calendar startDate={item} />
                </View>
              ))}
            </Swiper>
          </View>
        ) : null}

        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{activity.description}</Text>
        </View>
      </ScrollView>

      {Platform.OS === 'android' || Platform.OS === 'ios' ? (
        <BottomSheet
          backgroundStyle={styles.bottomSheetContainer}
          ref={sheetRef}
          snapPoints={['12.5%', '50%', '90%']}
          handleIndicatorStyle={styles.bottomSheetIndicator}
        >
          <Text style={styles.bottomSheetTitle}>Liked by</Text>
          {members.length === 0 ? (
            <BottomSheetView style={styles.emptyBSView}>
              <Text style={styles.emptyBSViewText}>
                Be the first to like this activity
              </Text>
            </BottomSheetView>
          ) : (
            <BottomSheetFlatList
              data={members}
              keyExtractor={i =>
                i.firstName.toString().concat(i.lastName.toString())
              }
              renderItem={({ item }) => <UserCard user={item} />}
              ListFooterComponent={renderFooter}
            />
          )}
        </BottomSheet>
      ) : null}
    </View>
  )
}
const getStyles = (theme, windowWidth) => {
  const tabletHeight = windowWidth >= 720 ? '5%' : '8%'
  const tabletPadding = windowWidth >= 720 ? '10%' : '5%'
  const webWidth = windowWidth >= 900 ? '60%' : '85%'

  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.backgroundPrimary,
      flex: 1,
      paddingHorizontal: Platform.select({
        ios: 20,
        android: 20,
        web: '20%',
      }),
    },
    sectionTitle: {
      fontFamily: 'Inter-Bold',
      fontSize: 18,
      marginBottom: 15,
      color: theme.colors.title,
    },
    imageContainer: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      width: '100%',
      height: 225,
      borderRadius: 15,
      marginBottom: 20,
      marginTop: 20,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 15,
    },
    calendarSection: {
      marginBottom: 20,
    },
    swiper: {
      height: 110,
    },
    slide: {
      flex: 1,
    },
    pagination: {
      bottom: 0,
    },
    descriptionSection: {
      marginBottom: 150,
    },
    descriptionText: {
      fontFamily: 'Inter-Regular',
      color: theme.colors.text,
    },
    bottomSheetTitle: {
      fontFamily: 'Inter-Bold',
      fontSize: 24,
      marginBottom: 15,
      paddingHorizontal: 20,
      paddingTop: 10,
      color: theme.colors.title,
    },
    bottomSheetContainer: {
      backgroundColor: theme.colors.accent,
    },
    bottomSheetIndicator: {
      backgroundColor: theme.colors.title,
    },
    emptyBSView: {
      flex: 1,
      paddingTop: 80,
    },
    emptyBSViewText: {
      textAlign: 'center',
      fontFamily: 'Inter-Bold',
      fontSize: Platform.select({
        ios: 17,
        android: 16,
      }),
      color: theme.colors.text,
    },
  })
}

export default Activity
