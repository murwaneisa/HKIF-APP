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
  const cardWidth = screenWidth * 0.33
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
          {/* <Text style={styles.title} numberOfLines={1}>
            {props.title}
          </Text> */}
          <View style={styles.buttonContainer}>
            <Pressable onPress={() => console.log('test')}>
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
      width: (screenWidth - 15 * 2) * 0.25,
      // height: (screenWidth - 15 * 2) * 0.25,
      // padding: 5,
      marginBottom: Platform.select({
        ios: 15,
        android: 13,
      }),
      // backgroundColor: 'red',
    },
    container: {
      height: (screenWidth - 15 * 2) * 0.25,
      // backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      // padding: 10,
      padding: 5,
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
      }),
    },
    icon: {
      fontSize: Platform.select({
        ios: 40,
        android: 32,
      }),
    },
    title: {
      fontFamily: 'Inter-SemiBold',
      fontSize: Platform.select({
        ios: 16,
        android: 14,
      }),
      color: theme.colors.text,
      textAlign: 'center',
      // backgroundColor: 'red',
    },
    buttonContainer: {
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 1,
    },
    favoriteIcon: {
      fontSize: Platform.select({
        ios: 28,
        android: 24,
      }),
    },
  })

export default ActivityCard
