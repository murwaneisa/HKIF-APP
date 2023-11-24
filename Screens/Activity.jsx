import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { useTheme } from '../Styles/theme'
import Swiper from 'react-native-swiper'
import Calendar from '../Components/Calendar'
import BottomSheet from 'react-native-simple-bottom-sheet'

function Activity({ navigation }) {
  const { theme } = useTheme()
  const styles = getStyles(theme)

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

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../Assets/images/movie.jpg')}
            resizeMode='cover'
          />
        </View>
        <View style={styles.nextSessionCard}>
          <Text style={styles.nextSessionCardTitle}>
            NEXT SESSION: 16:00 - 18:00
          </Text>
          <View style={styles.nextSessionCardFlex}>
            <View style={styles.profileImageContainer}>
              <Image
                style={styles.profileImage}
                source={require('../Assets/images/movie.jpg')}
                resizeMode='cover'
              />
            </View>
            <View style={styles.nextSessionCardContent}>
              <Text style={styles.nextSessionCardContentTitle}>
                Thursday, September 28th
              </Text>
              <Text style={styles.nextSessionCardContentSubtitle}>
                Coach: XXXX | Location: The Gym
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.scheduleContainer}>
          <Swiper
            style={styles.swiper}
            paginationStyle={styles.pagination}
            activeDotColor={theme.colors.primary}
          >
            {/* Schedule List 1 */}
            <View style={styles.slide}>
              <Text style={styles.scheduleTitle}>
                Schedule - {formatDate(new Date())}
              </Text>
              <Calendar startDate={new Date()} />
            </View>

            {/* Schedule List 2 */}
            <View style={styles.slide}>
              <Text style={styles.scheduleTitle}>
                Schedule -{' '}
                {formatDate(
                  new Date(new Date().setDate(new Date().getDate() + 7))
                )}
              </Text>
              <Calendar
                startDate={
                  new Date(new Date().setDate(new Date().getDate() + 7))
                }
              />
            </View>
          </Swiper>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            Write a short description about the activity here. Write a short
            description about the activity here. Write a short description about
            the activity here.
          </Text>
        </View>
      </ScrollView>
      <View style={styles.bottomSheetContainer}>
        <View>
          <Text>Your content</Text>
        </View>
        <BottomSheet isOpen={false}>
          <View style={{ backgroundColor: 'red', height: 600 }}></View>
        </BottomSheet>
      </View>
    </View>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
    },
    bottomSheetContainer: {
      flex: 1,
    },
    scheduleContainer: {
      // flex: 1,
      // backgroundColor: 'red',
    },
    swiper: {
      height: 120,
    },
    slide: {
      flex: 1,
    },
    pagination: {
      bottom: 10,
    },
    scheduleTitle: {
      fontFamily: 'Inter-Bold',
      fontSize: 18,
      marginBottom: 0,
    },
    imageContainer: {
      width: '100%',
      height: 250,
      borderRadius: 15,
      marginBottom: 15,
      paddingTop: 20,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 15,
    },
    nextSessionCard: {
      backgroundColor: theme.colors.primary,
      borderRadius: 15,
      padding: 15,
      marginBottom: 15,
    },
    nextSessionCardTitle: {
      fontFamily: 'Inter-Bold',
      fontSize: 12,
      marginBottom: 10,
      color: 'rgba(255, 255, 255, 1)',
    },
    nextSessionCardFlex: {
      flexDirection: 'row',
    },
    profileImageContainer: {
      width: 45,
      height: 45,
      marginRight: 10,
      borderRadius: 50,
    },
    profileImage: {
      width: '100%',
      height: '100%',
      borderRadius: 50,
    },
    nextSessionCardContent: {
      // marginTop: 2,
    },
    nextSessionCardContentTitle: {
      fontFamily: 'Inter-Bold',
      fontSize: 16,
      marginBottom: 5,
      color: 'rgba(255, 255, 255, 1)',
    },
    nextSessionCardContentSubtitle: {
      fontFamily: 'Inter-SemiBold',
      color: 'rgba(255, 255, 255, 0.85)',
      fontSize: 13,
    },
    calendarContainer: {
      // marginVertical: 10,
    },
    descriptionContainer: {
      marginBottom: 40,
    },
    descriptionTitle: {
      fontFamily: 'Inter-Bold',
      fontSize: 18,
      marginBottom: 10,
    },
    descriptionText: {
      fontFamily: 'Inter-Regular',
    },
  })

export default Activity
