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

const ActivityCard = ({ event, previous }) => {
  const windowWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, windowWidth, previous)
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
          <View style={[styles.dateItem, { marginRight: 5 }]}>
            <Text style={styles.dateText}>{event.date}</Text>
          </View>
          <View style={styles.dateItem}>
            <Text style={styles.dateText}>{event.startTime}</Text>
          </View>
        </View>
        <View style={[styles.dateContainer, { marginTop: 5 }]}>
          <Ionicons
            name='location-outline'
            size={24}
            color={theme.colors.text}
          />
          <Text style={styles.location}>{event.address}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
        >
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
        {previous ? (
          <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]}>
            <Text style={styles.buttonText}>delete</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  )
}
const getStyles = (theme, windowWidth, previous) => {
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
      color: theme.colors.text2,
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
      width: previous ? '48%' : '100%',
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
