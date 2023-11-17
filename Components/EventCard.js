import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useTheme } from '../Styles/theme'
import { Ionicons } from '@expo/vector-icons'

const EventCard = () => {
  const { theme } = useTheme()
  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../Assets/images/movie.jpg')}
          resizeMode='cover'
        />
      </View>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>Movie Night</Text>
          <View style={styles.textContainer}>
            <Ionicons
              name='ios-location'
              size={14}
              color='rgba(255,255,255,0.8)'
            />
            <Text style={styles.text}>Högskolan Kristianstad</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.textContainer}>
            <Ionicons
              name='ios-calendar'
              size={14}
              color='rgba(255,255,255,0.8)'
            />
            <Text style={styles.text}>18 jun, 2023</Text>
          </View>
          <View style={styles.textContainer}>
            <Ionicons name='time' size={14} color='rgba(255,255,255,0.8)' />
            <Text style={styles.text}>kl 16:00</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
      flexDirection: 'row',
      padding: 10,
      height: 110,
      marginBottom: 15,
      borderRadius: 15,
      shadowColor: 'black',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 8,
    },
    imageContainer: {
      height: '100%',
      width: 120,
      borderRadius: 15,
      marginRight: 15,
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
      fontSize: 18,
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
      fontSize: 12,
      marginLeft: 4,
      color: 'white',
    },
  })

export default EventCard
