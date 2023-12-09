import React from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Platform,
} from 'react-native'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme } from '../../Styles/theme'

const DarkLightSwitch = () => {
  const { theme, toggleTheme, isDarkMode } = useTheme()
  /*  '#494F55' */

  const textColor = theme.colors.text
  const iconName = isDarkMode ? 'white-balance-sunny' : 'moon'
  const IconComponent = isDarkMode ? MaterialCommunityIcons : Feather
  const text = isDarkMode ? 'Light Mode' : 'Dark Mode'

  return (
    <TouchableOpacity style={[styles.switch]} onPress={toggleTheme}>
      {/* Icon */}
      <IconComponent name={iconName} size={24} color={textColor} />
      {/* Text */}
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  )
}

export default DarkLightSwitch

const styles = StyleSheet.create({
  switch: {
    flexDirection: 'row', // Align children in a row
    width: 136, // Increase width to accommodate text
    height: 40, // Adjust height if needed
    alignItems: 'center', // Center items vertically
    justifyContent: 'start', // Center items horizontally
  },
  text: {
    marginLeft: 5,
    fontFamily: 'Inter-Medium',
    fontSize: Platform.select({
      ios: 16,
      android: 14,
      wed: 20,
    }),
  },
})
