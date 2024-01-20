import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Pressable,
  Dimensions,
} from 'react-native'
import { useTheme } from '../Styles/theme'
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'

const ActivityCard = props => {
  const screenWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, screenWidth)

  return (
    <View style={styles.item}>
      <Pressable onPress={props.onPress}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Ionicons
              name={props.icon}
              color={'rgba(0,0,0,0.8)'}
              style={styles.icon}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Pressable onPress={props.onPressFavorite}>
              <MaterialIcons
                name={props.favorite === true ? 'favorite' : 'favorite-border'}
                color='rgba(255,255,255,0.8)'
                style={styles.favoriteIcon}
              />
            </Pressable>
          </View>
        </View>
      </Pressable>

      <Text style={styles.title} numberOfLines={1}>
        {props.title}
      </Text>
    </View>
  )
}

const getStyles = (theme, screenWidth) =>
  StyleSheet.create({
    item: {
      width: Platform.select({
        ios: (screenWidth - 15 * 2) * 0.25,
        android: (screenWidth - 15 * 2) * 0.25,
        web: screenWidth * 0.08,
      }),
      marginTop: Platform.select({
        ios: 15,
        android: 15,
        web: 20,
      }),
    },
    container: {
      height: Platform.select({
        ios: (screenWidth - 15 * 2) * 0.25,
        android: (screenWidth - 15 * 2) * 0.25,
        web: screenWidth * 0.08,
      }),
      justifyContent: 'center',
      alignItems: 'center',
      padding: Platform.select({
        ios: 5,
        android: 5,
        web: 10,
      }),
    },
    iconContainer: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primary,
      borderRadius: 15,
      shadowColor: 'black',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 8,
      marginBottom: Platform.select({
        ios: 4,
        android: 2,
        web: 8,
      }),
    },
    icon: {
      fontSize: Platform.select({
        ios: 40,
        android: 32,
        web: 55,
      }),
    },
    title: {
      fontFamily: 'Inter-SemiBold',
      fontSize: Platform.select({
        ios: 16,
        android: 14,
        web: 18,
      }),
      color: theme.colors.text,
      textAlign: 'center',
    },
    buttonContainer: {
      position: 'absolute',
      top: Platform.select({
        ios: 10,
        android: 10,
        web: 10,
      }),
      right: Platform.select({
        ios: 10,
        android: 10,
        web: 16,
      }),
      zIndex: 1,
    },
    favoriteIcon: {
      fontSize: Platform.select({
        ios: 28,
        android: 24,
        web: 32,
      }),
    },
  })

export default ActivityCard
