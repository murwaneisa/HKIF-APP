import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Platform,
  Dimensions,
} from 'react-native'
import { useTheme } from '../../Styles/theme'
import { Ionicons } from '@expo/vector-icons'
import DateFormatter from '../../Utilities/Helper/DateFormatter'

const EventCard = ({ data, onPress, webWidth, marginBottom }) => {
  const { theme } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const styles = getStyles(theme, windowWidth)

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          marginBottom: marginBottom,
          width: Platform.select({ web: webWidth }),
        },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: data.imageUrl,
          }}
          resizeMode='cover'
        />
      </View>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.textContainer}>
            <Ionicons name='ios-location' style={styles.icon} />
            <Text style={styles.text}>Högskolan Kristianstad</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.textContainer}>
            <Ionicons name='ios-calendar' style={styles.icon} />
            <Text style={styles.text}>
              {DateFormatter.formatDate(data.startTime)}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Ionicons name='time' style={styles.icon} />
            <Text style={styles.text}>
              kl {DateFormatter.formatTime(data.startTime)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

const getStyles = (theme, windowWidth) =>
  StyleSheet.create({
    container: {
      width: Platform.select({
        ios: '100%',
        android: '100%',
      }),
      backgroundColor: theme.colors.primary,
      flexDirection: 'row',
      padding: Platform.select({
        ios: 10,
        android: 10,
        web: 20,
      }),
      height: Platform.select({
        ios: 125,
        android: 125,
        web: 180,
      }),
      borderRadius: 15,
      shadowColor: 'black',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 8,
    },
    imageContainer: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      width: Platform.select({
        ios: '33%',
        android: '35%',
        web: '40%',
      }),
      height: '100%',
      borderRadius: 15,
      marginRight: Platform.select({
        ios: 10,
        android: 10,
        web: 15,
      }),
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
        ios: 17,
        android: 17,
        web: 22,
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
        ios: 15,
        android: 14,
        web: 18,
      }),
      color: 'white',
    },
    icon: {
      color: 'rgba(255,255,255,0.8)',
      fontSize: Platform.select({
        ios: 18,
        android: 16,
        web: 18,
      }),
      marginRight: 4,
    },
  })

export default EventCard
