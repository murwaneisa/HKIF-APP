import {
  View,
  Text,
  Dimensions,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native'
import React from 'react'
import { useTheme } from '../../../Styles/theme'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import {
  deleteExistingEvent,
  fetchEventById,
} from '../../../Utilities/Redux/Actions/eventActions'
import DateFormatter from '../../../Utilities/Helper/DateFormatter'

const EventCard = ({ event, previous = false, isEligible }) => {
  const navigation = useNavigation()
  const windowWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, windowWidth, previous)
  const dispatch = useDispatch()

  const handleDelete = id => {
    if (!isEligible) {
      alert('You are not authorized to delete events')
      return
    }
    const deleteConfirmation = () => {
      console.log('OK Pressed, delete event with ID:', id)
      dispatch(deleteExistingEvent(id))
    }

    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to delete this event?')) {
        deleteConfirmation()
      }
    } else {
      Alert.alert(
        'Confirm Delete', // Title
        'Are you sure you want to delete this event?', // Message
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: deleteConfirmation,
          },
        ]
      )
    }
  }

  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: event.imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{event.title}</Text>
        <View style={styles.dateContainer}>
          <View style={[styles.dateItem, { marginRight: 5 }]}>
            <Text style={styles.dateText}>
              {DateFormatter.formatDate(event.startTime)}
            </Text>
          </View>
          <View style={styles.dateItem}>
            <Text style={styles.dateText}>
              {DateFormatter.formatTime(event.startTime)}
            </Text>
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
          onPress={async () => {
            if (!isEligible) {
              navigation.navigate('EventDetails', {
                event: event,
              })
              return
            }
            navigation.navigate('AddEvent', { eventId: event._id })
          }}
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
        >
          <Text style={styles.buttonText}>{previous ? 'Publish' : 'View'}</Text>
        </TouchableOpacity>
        {previous ? (
          <TouchableOpacity
            onPress={() => handleDelete(event._id)}
            style={[styles.button, { backgroundColor: 'red' }]}
          >
            <Text style={styles.buttonText}>Delete</Text>
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
export default EventCard
