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

const ActivityCard = ({ event }) => {
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
        <View style={styles.dateContainer}>
          <Text style={styles.date}>Jun 25, 2023 9:00 AM</Text>
          <Text style={styles.date}> 9:00 AM</Text>
        </View>
        <Text style={styles.location}>Chicago, IL</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
        >
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
        {/*  <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]}>
            <Text style={styles.buttonText}>delete</Text>
          </TouchableOpacity> */}
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
      backgroundColor: '#ffffff',
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
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 8,
    },
    dateContainer: {
      backgroundColor: 'red',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    date: {
      backgroundColor: 'red',
      fontSize: 14,
      borderRadius: 8,
      padding: 12,
      alignItems: 'center',
    },
    location: {
      fontSize: 14,
      marginBottom: 16,
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
  })
}
export default ActivityCard
