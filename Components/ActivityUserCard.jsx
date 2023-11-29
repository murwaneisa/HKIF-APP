import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useTheme } from '../Styles/theme'

const ActivityUserCard = () => {
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
      <View style={styles.titleContainer}>
        <Text style={styles.title}>John Doe</Text>
      </View>
    </View>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingRight: 15,
      marginLeft: 15,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0,0,0,0.1)',
      alignItems: 'center',
    },
    imageContainer: {
      width: 35,
      height: 35,
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
      fontFamily: 'Inter-Bold',
      fontSize: 16,
      color: 'rgba(0, 0, 0, 1)',
    },
  })

export default ActivityUserCard
