import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../Styles/theme'
import { MaterialIcons } from '@expo/vector-icons'

const Announcement = ({ message }) => {
  const { theme } = useTheme()
  const styles = getStyles(theme)

  return (
    <View style={styles.item}>
      <MaterialIcons
        style={styles.icon}
        name='announcement'
        size={24}
        color={'rgba(255,255,255,0.8)'}
      />
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    item: {
      backgroundColor: theme.colors.primary,
      padding: 15,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 15,
      shadowColor: 'black',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 8,
    },
    icon: {
      flex: 0,
      paddingTop: 2,
    },
    text: {
      flex: 1,
      fontFamily: 'Inter-Medium',
      marginLeft: 10,
      fontSize: 15,
      marginTop: -2,
      color: 'white',
    },
  })

export default Announcement
