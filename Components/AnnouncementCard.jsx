import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { useTheme } from '../Styles/theme'
import { MaterialIcons } from '@expo/vector-icons'

const AnnouncementCard = ({ message }) => {
  const { theme } = useTheme()
  const styles = getStyles(theme)

  return (
    <View style={styles.item}>
      <MaterialIcons style={styles.icon} name='announcement' />
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    item: {
      backgroundColor: theme.colors.primary,
      padding: Platform.select({
        ios: 15,
        android: 15,
        web: 20,
      }),
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 15,
      shadowColor: 'black',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 8,
    },
    icon: {
      paddingTop: 2,
      fontSize: Platform.select({
        ios: 24,
        android: 24,
        web: 30,
      }),
      color: 'rgba(255,255,255,0.8)',
    },
    text: {
      flex: 1,
      fontFamily: 'Inter-Medium',
      marginLeft: 10,
      fontSize: Platform.select({
        ios: 15,
        android: 15,
        web: 18,
      }),
      marginTop: -2,
      color: 'white',
    },
  })

export default AnnouncementCard
