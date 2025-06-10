import React from 'react'
import { View, Text, StyleSheet, Image, Platform } from 'react-native'


const UserCard = ({ user }) => {
 
   const styles = getStyles()

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../Assets/images/movie.jpg')}
          resizeMode='cover'
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {user.firstName} {user.lastName}
        </Text>
      </View>
    </View>
  )
}

const getStyles =()=>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: 10,
      marginHorizontal: Platform.select({
        ios: 20,
        android: 20,
        web: 20,
      }),
      alignItems: 'center',
      marginBottom: 5,
      borderBottomWidth: 1,
      borderBottomColor: 'green',
    },
    imageContainer: {
      width: 42,
      height: 42,
      marginRight: 10,
      borderRadius: 100,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 100,
    },
    titleContainer: {
      flex: 1,
    },
    title: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 16,
      color: '#6B6B6B',
    },
  })

export default UserCard
