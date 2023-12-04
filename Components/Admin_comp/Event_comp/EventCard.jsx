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

const EventCard = ({ event }) => {
  const windowWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, windowWidth)
  const [user, setUser] = useState({ role: 'superAdmin' })
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: event.imageUrl }} // Replace with your image URL
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.date}>Jun 25, 2023 9:00 AM</Text>
        <Text style={styles.location}>Chicago, IL</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View details</Text>
      </TouchableOpacity>
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
      backgroundColor: '#ffffff',
      marginTop: 10,
    },
    image: {
      width: '100%',
      height: 150, // Adjust as needed
    },
    textContainer: {
      padding: 16,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 8,
    },
    date: {
      fontSize: 14,
      marginBottom: 4,
    },
    location: {
      fontSize: 14,
      marginBottom: 16,
    },
    button: {
      backgroundColor: '#007bff',
      padding: 12,
      alignItems: 'center',
    },
    buttonText: {
      color: '#ffffff',
      fontWeight: 'bold',
    },
  })
}
export default EventCard
