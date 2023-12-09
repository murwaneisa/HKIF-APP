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
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../Assets/images/movie.jpg')}
            resizeMode='cover'
          />
        </View>

        <View style={styles.headerSection}>
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.title}>Movie Night</Text>
            <View style={styles.textWrapper}>
              <Ionicons
                name='location-outline'
                size={17}
                color='black'
                style={styles.icon}
              />
              <Text style={styles.addressText}>Högskolan Kristianstad</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 15,
            }}
          >
            <View style={styles.textWrapper}>
              <Ionicons
                name='calendar-outline'
                size={16}
                color='black'
                style={styles.icon}
              />
              <Text style={styles.dateText}>14 dec, 2023</Text>
            </View>
            <View style={styles.textWrapper}>
              <Ionicons
                name='time-outline'
                size={16}
                color='black'
                style={styles.icon}
              />
              <Text style={styles.dateText}>16:00 - 18:00</Text>
            </View>
          </View>
          <View style={styles.benefitsList}>
            <View style={styles.benefitCard}>
              <View style={styles.textWrapper}>
                <Ionicons
                  name='fast-food-outline'
                  size={17}
                  color='black'
                  style={styles.icon}
                />
                <Text style={styles.benefitText}>Food</Text>
              </View>
            </View>
            <View style={styles.benefitCard}>
              <View style={styles.textWrapper}>
                <Ionicons
                  name='fast-food-outline'
                  size={17}
                  color='black'
                  style={styles.icon}
                />
                <Text style={styles.benefitText}>Food</Text>
              </View>
            </View>
            <View style={styles.benefitCard}>
              <View style={styles.textWrapper}>
                <Ionicons
                  name='fast-food-outline'
                  size={17}
                  color='black'
                  style={styles.icon}
                />
                <Text style={styles.benefitText}>Food</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionText}>
            Excellent two-storey villa with a terrace, private pool and parking
            spaces is located only 5 minutes from the Indian Ocean
          </Text>
        </View>

        <View style={styles.usersSection}>
          <View style={styles.usersSectionHeader}>
            <Text style={styles.SectionTitle}>People who've joined</Text>
            <Pressable onPress={() => navigation.navigate('EventUsers')}>
              <Text style={styles.viewAll}>VIEW ALL</Text>
            </Pressable>
          </View>
          <FlatList
            data={data}
            renderItem={({ item }) => <EventUserCard />}
            keyExtractor={i => i}
          />
        </View>
      </ScrollView>

      <View style={styles.ctaWrapper}>
        <Text style={styles.ctaTitle}>Price: 300 SEK</Text>
        <View style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Join event</Text>
        </View>
      </View>
    </View>
  )
}

const getStyles = (theme, windowWidth) => {
  const tabletHeight = windowWidth >= 720 ? '5%' : '8%'
  const tabletPadding = windowWidth >= 720 ? '10%' : '5%'
  const webWidth = windowWidth >= 900 ? '60%' : '85%'

  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: Platform.select({
        ios: 0,
        android: 0,
        web: '20%',
      }),
    },
    ctaWrapper: {
      position: 'absolute',
      left: Platform.select({
        ios: 0,
        android: 0,
        web: '20%',
      }),
      right: Platform.select({
        ios: 0,
        android: 0,
        web: '20%',
      }),
      bottom: 0,
      margin: 20,
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 13,
      height: Platform.select({
        ios: 85,
        android: 85,
        web: 100,
      }),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 15,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.1)',
    },
    ctaTitle: {
      fontFamily: 'Inter-SemiBold',
      fontSize: Platform.select({
        ios: 16,
        android: 16,
        web: 20,
      }),
    },
    ctaButton: {
      backgroundColor: theme.colors.primary,
      height: '100%',
      width: '48%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
    },
    ctaButtonText: {
      color: 'white',
      fontFamily: 'Inter-Bold',
      fontSize: Platform.select({
        ios: 15,
        android: 15,
        web: 20,
      }),
    },
    scrollView: {
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
    textWrapper: {
      flexDirection: 'row',
    },
    icon: {
      marginRight: 4,
    },
    title: {
      fontFamily: 'Inter-Bold',
      fontSize: 24,
      marginBottom: 7,
    },
    addressText: {
      fontFamily: 'Inter-Regular',
      fontSize: 15,
    },
    dateText: {
      fontFamily: 'Inter-Regular',
      fontSize: 15,
    },
    benefitsList: {
      flexDirection: 'row',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderColor: 'rgba(0,0,0,0.1)',
      marginTop: 4,
    },
    benefitCard: {
      paddingVertical: 5,
      marginRight: 10,
      minWidth: 75,
    },
    benefitText: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
    },
    descriptionSection: {
      marginBottom: 25,
    },
    descriptionText: {
      fontFamily: 'Inter-Regular',
      fontSize: 17,
      lineHeight: 22,
    },
    usersSection: {
      marginBottom: 125,
    },
    usersSectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    SectionTitle: {
      fontFamily: 'Inter-Bold',
      fontSize: 20,
    },
    viewAll: {
      color: theme.colors.primary,
      fontFamily: 'Inter-SemiBold',
      fontSize: 13,
    },
  })
}

export default Event
