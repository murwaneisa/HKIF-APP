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
import React from 'react'
import { useTheme } from '../../../Styles/theme'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import ActivityCard from '../Activity_comp/ActivityCard'

const RenderActivities = () => {
  const navigation = useNavigation()
  const windowWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, windowWidth)

  const activeList = [
    {
      title: 'Football Championship',
      sport: 'Football',
      address: 'National Football Stadium, 123 Sports Lane',
      coach: ['John Doe', 'Jane Smith'],
      date: '2023-07-16',
      startTime: '10:00 AM',
      imageUrl: 'https://source.unsplash.com/featured/?football',
    },
    {
      title: 'Tech Padel Tournament',
      sport: 'Padel',
      address: 'City Padel Hall, 456 Padel Road',
      coach: ['Mike Johnson', 'Mike Johnson', 'Mike Johnson', 'Mike Johnson'],
      date: '2023-08-21',
      startTime: '9:00 AM',
      imageUrl: 'https://source.unsplash.com/featured/?padel',
    },
    {
      title: 'Marathon Training Session',
      sport: 'Running',
      address: 'Marathon Park, 789 Riverside Avenue',
      coach: ['Emily Davis', 'Chris Brown'],
      date: '2023-09-10',
      startTime: '7:00 AM',
      imageUrl: 'https://source.unsplash.com/featured/?running',
    },
    {
      title: 'Local Tennis Open',
      sport: 'Tennis',
      address: 'Central Tennis Courts, 321 Main St',
      coach: ['Laura Wilson'],
      date: '2023-10-05',
      startTime: '11:00 AM',
      imageUrl: 'https://source.unsplash.com/featured/?tennis',
    },
    {
      title: 'Autumn Golf Classic',
      sport: 'Golf',
      address: 'Green Meadows Golf Course, 654 Elm St',
      coach: ['Robert Martinez', 'Samantha Lee'],
      date: '2023-11-15',
      startTime: '6:00 PM',
      imageUrl: 'https://source.unsplash.com/featured/?golf',
    },
  ]

  const renderHeader = () => (
    <View style={styles.titleContainer}>
      <Text style={styles.header}>(5) Current Activities</Text>
      <TouchableOpacity
        style={styles.subtitleContainer}
        onPress={() => navigation.navigate('AddLeader')}
      >
        <AntDesign name='pluscircleo' size={22} color={theme.colors.primary} />
        <Text style={styles.subHeader}>Add Leader</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <>
      {Platform.OS === 'web' ? (
        <View style={styles.container}>
          {renderHeader()}
          {activeList.map((activity, index) => (
            <ActivityCard key={index} activity={activity} />
          ))}
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader}
          data={activeList}
          renderItem={({ item, index }) => (
            <ActivityCard key={index} activity={item} />
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

export default RenderActivities
