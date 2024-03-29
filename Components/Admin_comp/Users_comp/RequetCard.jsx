import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '../../../Styles/theme'
import { FontAwesome } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import {
  convertToNormalWord,
  formatDate,
} from '../../../Utilities/Helper/fomatWord'

const RequestCard = ({ user }) => {
  const windowWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const [imageError, setImageError] = useState(false)
  const styles = getStyles(theme, windowWidth)
  const iconSize = Math.min(styles.image.width, styles.image.height)
  const convertedMembType = convertToNormalWord(user.membershipType)

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View>
          {user.imageUrl && !imageError ? (
            <Image
              source={{ uri: user.imageUrl }}
              style={styles.image}
              onError={() => setImageError(true)}
            />
          ) : (
            <View style={styles.image}>
              <FontAwesome
                name='user-circle'
                size={iconSize}
                color={theme.colors.text}
              />
            </View>
          )}
        </View>
        <View style={styles.details}>
          <Text
            style={styles.name}
          >{`${user.firstName} ${user.lastName}`}</Text>
          <Text style={styles.text}>{convertedMembType}</Text>
          <Text style={styles.text}>{user.phoneNumber}</Text>
          <Text style={styles.text}>{formatDate(user.updatedAt)}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <AntDesign
              name='closecircle'
              size={24}
              color={theme.colors.error}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <AntDesign
              name='checkcircle'
              size={24}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
const getStyles = (theme, windowWidth) => {
  const tabletPadding = windowWidth >= 720 ? 15 : 0
  const webWidth = windowWidth >= 900 ? '60%' : '85%'
  return StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: theme.colors.backgroundSecondary,
      alignItems: 'center',
      marginTop: 10,
    },
    cardContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.accent2,
      borderRadius: 8,
      padding: 10,
      width: Platform.select({
        ios: '90%',
        android: '90%',
        web: webWidth,
      }),
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 45,
      marginRight: 10,
    },
    details: {
      flex: 1,
      paddingLeft: Platform.select({
        ios: 0,
        android: tabletPadding,
        web: 12,
      }),
    },
    name: {
      fontFamily: 'Inter-SemiBold',
      fontWeight: 'bold',
      color: theme.colors.title,
      fontSize: Platform.select({
        ios: 16,
        android: 14,
        web: 16,
      }),
    },
    text: {
      color: theme.colors.text,
      fontFamily: 'Inter-SemiBold',
      fontSize: Platform.select({
        ios: 14,
        android: 12,
        web: 16,
      }),
    },
    membership: {
      fontSize: 14,
      color: '#666',
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionButton: {
      marginLeft: Platform.select({
        ios: 10,
        android: 10,
        web: 20,
      }),
    },
    pressed: {
      opacity: 0.5,
    },
  })
}
export default RequestCard
