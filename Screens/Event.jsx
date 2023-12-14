import React, { useMemo } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native'
import { useTheme } from '../Styles/theme'
import { Ionicons } from '@expo/vector-icons'
import EventUserCard from '../Components/EventUserCard'
import BenefitCard from '../Components/BenefitCard'
import JointEventCard from '../Components/JointEventCard'

function Event({ navigation }) {
  const { theme } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const styles = getStyles(theme, windowWidth)

  const data = useMemo(
    () =>
      Array(10)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  )

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.headerComponent}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require('../Assets/images/movie.jpg')}
                resizeMode='cover'
              />
            </View>
            <View style={styles.headerSection}>
              <View style={styles.headerInfoWrapper}>
                <Text style={styles.title}>Movie Night</Text>
                <View style={styles.textWrapper}>
                  <Ionicons name='location-outline' style={styles.icon} />
                  <Text style={styles.addressText}>Högskolan Kristianstad</Text>
                </View>
              </View>

              <View style={styles.dateInfoWrapper}>
                <View style={styles.textWrapper}>
                  <Ionicons name='calendar-outline' style={styles.icon} />
                  <Text style={styles.dateText}>14 dec, 2023</Text>
                </View>
                <View style={styles.textWrapper}>
                  <Ionicons name='time-outline' style={styles.icon} />
                  <Text style={styles.dateText}>16:00 - 18:00</Text>
                </View>
              </View>

              <View style={styles.benefitsList}>
                <BenefitCard iconName={'fast-food-outline'} title={'Food'} />
                <BenefitCard iconName={'fast-food-outline'} title={'Food'} />
                <BenefitCard iconName={'fast-food-outline'} title={'Food'} />
              </View>
            </View>
            <View style={styles.descriptionSection}>
              <Text style={styles.descriptionText}>
                Excellent two-storey villa with a terrace, private pool and
                parking spaces is located only 5 minutes from the Indian Ocean
              </Text>
            </View>
            <View style={styles.usersSectionHeader}>
              <Text style={styles.SectionTitle}>People who've joined</Text>
              <Pressable onPress={() => navigation.navigate('EventUsers')}>
                <Text style={styles.viewAll}>View all</Text>
              </Pressable>
            </View>
          </View>
        }
        data={data}
        renderItem={({ item }) => <EventUserCard />}
        keyExtractor={i => i}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ marginBottom: 110 }} />}
      />

      <JointEventCard
        title={'Price: 300 SEK'}
        buttonTitle={'Join Event'}
        onPress={() => {}}
      />
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
      color: theme.colors.text,
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
      borderColor: theme.colors.accent,
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
    SectionTitle: {
      fontFamily: 'Inter-Bold',
      fontSize: 20,
      color: theme.colors.text,
    },
    viewAll: {
      color: theme.colors.primary,
      fontFamily: 'Inter-SemiBold',
      fontSize: 14,
    },
  })
}

export default Event
