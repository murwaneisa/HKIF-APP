import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import { useTheme } from '../Styles/theme'
import { AntDesign } from '@expo/vector-icons'

const UserRequest = () => {
  const windowWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, windowWidth)
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View>
          <Image
            source={require('../Assets/images/image.jpeg')}
            style={styles.image}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.name}>Anak Anastasia</Text>
          <Text style={styles.text}>Full Membership</Text>
          <Text style={styles.text}>+46725382736</Text>
          <Text style={styles.text}>2023-11-12</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <AntDesign name='closecircle' size={24} color='red' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <AntDesign name='checkcircle' size={24} color='green' />
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
      backgroundColor: theme.colors.background2,
      alignItems: 'center',
      marginTop: 10,
    },
    cardContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.accent2,
      borderRadius: 8,
      padding: 15,
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
        web: 4,
      }),
    },
    name: {
      fontFamily: 'Inter-SemiBold',
      fontWeight: 'bold',
      color: theme.colors.text2,
      fontSize: 16,
    },
    text: {
      fontSize: 14,
      color: theme.colors.text,
      fontFamily: 'Inter-SemiBold',
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
      marginLeft: 10,
    },
    pressed: {
      opacity: 0.5,
    },
  })
}
export default UserRequest
