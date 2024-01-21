import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useTheme } from '../../Styles/theme'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const HeaderLeft = routeName => {
  const navigation = useNavigation()
  const { theme } = useTheme()
  const styles = getStyles(theme)

  if (routeName === 'Home') {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name='menu' style={styles.icon} />
        </TouchableOpacity>
      </View>
    )
  } else {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back-outline' style={styles.icon} />
        </TouchableOpacity>
      </View>
    )
  }
}

const getStyles = theme =>
  StyleSheet.create({
    wrapper: {
      marginLeft: 15,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    icon: {
      fontSize: 34,
      color: theme.colors.text,
    },
  })

export default HeaderLeft
