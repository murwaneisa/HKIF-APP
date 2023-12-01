import React, { useRef, useMemo } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { useTheme } from '../Styles/theme'
import Swiper from 'react-native-swiper'
import Calendar from '../Components/Calendar'
import NextActivitySessionCard from '../Components/NextActivitySessionCard'
import ActivityUserCard from '../Components/ActivityUserCard'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'

function Activity({ navigation }) {
  const sheetRef = useRef(null)
  const { theme } = useTheme()
  const styles = getStyles(theme)

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

        <View style={styles.calendarSection}>
          <Swiper
            style={styles.swiper}
            paginationStyle={styles.pagination}
            activeDotColor={theme.colors.primary}
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

        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>Description Text</Text>
        </View>
      </ScrollView>

      <BottomSheet
        backgroundStyle={styles.bottomSheetContainer}
        ref={sheetRef}
        snapPoints={['12.5%', '50%', '90%']}
      >
        <Text style={styles.bottomSheetTitle}>Liked by</Text>
        <BottomSheetFlatList
          data={data}
          keyExtractor={i => i}
          renderItem={({ item }) => <ActivityUserCard />}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheet>
    </View>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontFamily: 'Inter-Bold',
      fontSize: 18,
      marginBottom: 15,
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
    },
    bottomSheetTitle: {
      fontFamily: 'Inter-Bold',
      fontSize: 24,
      marginBottom: 15,
      paddingHorizontal: 20,
      paddingTop: 10,
    },
    bottomSheetContainer: {
      backgroundColor: 'rgba(228, 228, 228, 228)',
    },
  })

export default Activity
