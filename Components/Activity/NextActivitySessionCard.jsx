import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import DateFormatter from '../../Utilities/Helper/DateFormatter'

const NextActivitySessionCard = ({ sessionInfo }) => {
 
   const styles = getStyles()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        NEXT SESSION: {sessionInfo.session.startTime} -{' '}
        {sessionInfo.session.endTime}
      </Text>
      <View style={styles.box}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../Assets/images/movie.jpg')}
            resizeMode='cover'
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.contentHeader}>
            {sessionInfo.session.day},{' '}
            {DateFormatter.formatDate(sessionInfo.date)}
          </Text>
          <Text style={styles.contentText}>
            Coach: XXXX | Location: The Gym
          </Text>
        </View>
      </View>
    </View>
  )
}
const getStyles =()=>
  StyleSheet.create({
    container: {
      backgroundColor: 'green',
      borderRadius: 12,
      padding: 15,
    },
    title: {
      fontFamily: 'Inter-Bold',
      fontSize: 12,
      marginBottom: 10,
      color: 'rgba(255, 255, 255, 1)',
    },
    box: {
      flexDirection: 'row',
    },
    imageContainer: {
      width: 45,
      height: 45,
      marginRight: 10,
      borderRadius: 100,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 100,
    },
    contentHeader: {
      fontFamily: 'Inter-Bold',
      fontSize: 16,
      marginBottom: 5,
      color: 'rgba(255, 255, 255, 1)',
    },
    contentText: {
      fontFamily: 'Inter-SemiBold',
      color: 'rgba(255, 255, 255, 0.85)',
      fontSize: 13,
    },
  })

export default NextActivitySessionCard
