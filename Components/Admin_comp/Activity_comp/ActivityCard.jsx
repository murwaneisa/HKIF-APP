import {
  View,
  Text,
  Dimensions,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import { useTheme } from '../../../Styles/theme'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const ActivityCard = ({ activity }) => {
  const navigation = useNavigation()
  const windowWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, windowWidth)
  const [user, setUser] = useState({ role: 'superAdmin' })
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: activity.imageUrl }} // Replace with your image URL
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{activity.title}</Text>
        {/*      <View style={styles.dateContainer}>
          <View style={[styles.dateItem, { marginRight: 5 }]}>
            <Text style={styles.dateText}>{activity.date}</Text>
          </View>
          <View style={styles.dateItem}>
            <Text style={styles.dateText}>{activity.startTime}</Text>
          </View>
        </View> */}
        <View style={[styles.dateContainer, { marginTop: 5 }]}>
          <Ionicons
            name='location-outline'
            size={24}
            color={theme.colors.text}
          />
          <Text style={styles.location}>{activity.address}</Text>
        </View>
        <View style={styles.coachContainer}>
          <Text style={[styles.location, { fontWeight: 'bold' }]}>
            Coach |{' '}
          </Text>
          {activity.coach.length > 0 && (
            <View style={styles.coachItem}>
              <Image
                source={{ uri: 'https://source.unsplash.com/featured/?person' }} // Replace with first coach's image URL
                style={styles.coachImage}
              />
              <Text style={styles.coachName}>{activity.coach[0]}</Text>
            </View>
          )}
          {activity.coach.length > 1 && (
            <Text style={styles.additionalCoaches}>
              +{activity.coach.length - 1} more
            </Text>
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CreateActivity', { eventId: 'activity.id' })
          }
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
        >
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const getStyles = (theme, windowWidth) => {
  return StyleSheet.create({
    cardContainer: {
      width: '100%',
      borderRadius: 8,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
      backgroundColor: theme.colors.accent2,
      marginTop: 15,
    },
    image: {
      width: '100%',
      height: 100, // Adjust as needed
    },
    textContainer: {
      padding: 10,
    },
    title: {
      fontFamily: 'Inter-SemiBold',
      fontWeight: 'bold',
      fontSize: 15,
      marginBottom: 8,
      color: theme.colors.title,
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dateItem: {
      borderRadius: 8,
      padding: 12,
      backgroundColor: theme.colors.accent,
    },
    dateText: {
      fontSize: 14,
      color: theme.colors.text,
    },
    location: {
      fontSize: 14,
      textAlign: 'center',
      marginLeft: 5,
      color: theme.colors.text,
    },
    buttonContainer: {
      flexDirection: 'row',
      padding: 10,
      justifyContent: 'space-between',
    },
    button: {
      width: '100%',
      borderRadius: 8,
      padding: 12,
      alignItems: 'center',
    },
    buttonText: {
      color: '#ffffff',
      fontWeight: 'bold',
    },

    coachContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    coachItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 4,
    },
    coachImage: {
      width: 30, // Adjust as needed
      height: 30, // Adjust as needed
      borderRadius: 15,
    },
    coachName: {
      marginLeft: 5,
      color: theme.colors.text,
    },
    additionalCoaches: {
      fontSize: 14,
      color: theme.colors.text,
      marginLeft: 5,
    },
  })
}
export default ActivityCard
