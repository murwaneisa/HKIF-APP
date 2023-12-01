import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Platform,
} from 'react-native'
import { useTheme } from '../Styles/theme'
import { Ionicons } from '@expo/vector-icons'

const EventCard = props => {
  const { theme } = useTheme()
  const styles = getStyles(theme)

  return (
    <Pressable onPress={props.onPress}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../Assets/images/movie.jpg')}
            resizeMode='fit'
          />
        </View>
        <View style={styles.content}>
          <View>
            <Text style={styles.title}>Movie Night</Text>
            <View style={styles.textContainer}>
              <Ionicons
                name='ios-location'
                color='rgba(255,255,255,0.8)'
                style={styles.icon}
              />
              <Text style={styles.text}>Högskolan Kristianstad</Text>
            </View>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View style={styles.textContainer}>
              <Ionicons
                name='ios-calendar'
                color='rgba(255,255,255,0.8)'
                style={styles.icon}
              />
              <Text style={styles.text}>18 jun, 2023</Text>
            </View>
            <View style={styles.textContainer}>
              <Ionicons
                name='time'
                color='rgba(255,255,255,0.8)'
                style={styles.icon}
              />
              <Text style={styles.text}>kl 16:00</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
      flexDirection: 'row',
      padding: 10,
      height: 125,
      marginBottom: 15,
      borderRadius: 15,
      shadowColor: 'black',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 8,
    },
    imageContainer: {
      width: Platform.select({
        ios: '33%',
        android: '35%',
      }),
      height: '100%',
      borderRadius: 15,
      marginRight: 10,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 15,
    },
    content: {
      flex: 1,
      justifyContent: 'space-between',
    },
    title: {
      fontFamily: 'Inter-SemiBold',
      fontWeight: 'bold',
      fontSize: Platform.select({
        ios: 18,
        android: 18,
      }),
      marginBottom: 5,
      color: 'white',
    },
    textContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    text: {
      fontFamily: 'Inter-Regular',
      fontSize: Platform.select({
        ios: 16,
        android: 14,
      }),
      marginLeft: 4,
      color: 'white',
    },
    icon: {
      fontSize: Platform.select({
        ios: 18,
        android: 16,
      }),
    },
  })

export default EventCard
