import React, { useRef, useMemo } from 'react'
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
// import Swiper from 'react-native-swiper'
import Calendar from '../Components/Calendar'
import NextActivitySessionCard from '../Components/NextActivitySessionCard'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import UserCard from '../Components/UserCard'

function Activity({ navigation }) {
  const sheetRef = useRef(null)
  const { theme } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const styles = getStyles(theme, windowWidth)

  let Swiper

  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    Swiper = require('react-native-swiper').default
  } else {
    Swiper = undefined
  }

  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  )

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

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://images.unsplash.com/photo-1513635625218-6956bc843133?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vdGJhbGwlMjBpbiUyMHNwb3J0JTIwaGFsbHxlbnwwfHwwfHx8MA%3D%3D',
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
          <Text style={styles.descriptionText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
      </ScrollView>

      {Platform.OS === 'android' || Platform.OS === 'ios' ? (
        <BottomSheet
          backgroundStyle={styles.bottomSheetContainer}
          ref={sheetRef}
          snapPoints={['12.5%', '50%', '90%']}
        >
          <Text style={styles.bottomSheetTitle}>Liked by</Text>
          <BottomSheetFlatList
            data={data}
            keyExtractor={i => i}
            renderItem={({ item }) => <UserCard />}
            contentContainerStyle={styles.contentContainer}
          />
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
      backgroundColor: theme.colors.background,
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
      color: theme.colors.text2,
    },
    imageContainer: {
      width: '100%',
      height: 225,
      borderRadius: 15,
      marginBottom: 20,
      paddingTop: 20,
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
      color: theme.colors.text2,
    },
    bottomSheetContainer: {
      backgroundColor: theme.colors.background2,
    },
  })
}

export default Activity
