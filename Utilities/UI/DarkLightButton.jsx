import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme } from '../../Styles/theme'

const DarkLightSwitch = () => {
  const { theme, toggleTheme, isDarkMode } = useTheme()
  /*  '#494F55' */
  const backgroundColor = isDarkMode ? theme.colors.primary200 : '#494F55'
  const textColor = isDarkMode ? 'black' : 'white'
  const iconName = isDarkMode ? 'white-balance-sunny' : 'moon'
  const IconComponent = isDarkMode ? MaterialCommunityIcons : Feather
  const text = isDarkMode ? 'Light Mode' : 'Dark Mode'

  return (
    <TouchableOpacity
      style={[styles.switch, { backgroundColor }]}
      onPress={toggleTheme}
    >
      {/* Icon */}
      <IconComponent
        name={iconName}
        size={24}
        color={textColor}
        style={{ marginHorizontal: 5 }} // Add horizontal margin for spacing
      />
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
    borderRadius: 20, // Half of the height to make it pill-shaped
    alignItems: 'center', // Center items vertically
    justifyContent: 'start', // Center items horizontally
    paddingHorizontal: 1, // Padding on the sides
    // Shadow for both Android and iOS
    elevation: 3,
    /*     shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 3 }, */
  },
  text: {
    fontSize: 16, // Adjust text size as needed
    fontWeight: 'bold',
  },
})
