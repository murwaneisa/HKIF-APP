import React from 'react'
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native'
import { useTheme } from '../Styles/theme'
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'

const ActivityCard = props => {
  const { theme } = useTheme()
  const styles = getStyles(theme)

  return (
    <View style={styles.item}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons name={props.icon} size={44} color={'rgba(0,0,0,0.8)'} />
        </View>
        <Text style={styles.title}>{props.title}</Text>
        <View style={styles.buttonContainer}>
          <Pressable onPress={() => console.log('test')}>
            <MaterialIcons
              name={props.favorite === true ? 'favorite' : 'favorite-border'}
              size={24}
              color='rgba(255,255,255,0.8)'
            />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    item: {
      width: '33.33%',
      paddingHorizontal: 10,
      marginBottom: 15,
    },
    container: {
      height: 95,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 15,
      shadowColor: 'black',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 8,
    },
    iconContainer: {
      marginBottom: Platform.select({
        ios: 4,
      }),
    },
    title: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 12,
      color: 'white',
    },
    buttonContainer: {
      position: 'absolute',
      top: 8,
      right: 8,
      zIndex: 1,
    },
  })

export default ActivityCard
