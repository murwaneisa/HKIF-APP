import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme } from '../../Styles/theme'

const DarkLightButton = () => {
  const { theme, toggleTheme } = useTheme()
  // Styles for the dark and light mode buttons
  const buttonStyle = theme === 'light' ? styles.lightButton : styles.darkButton
  const textStyle = theme === 'light' ? styles.lightText : styles.darkText
  const iconName = theme === 'light' ? 'sun' : 'moon'
  const iconComponent = theme === 'light' ? MaterialCommunityIcons : AntDesign
  const iconColor = theme === 'light' ? 'black' : 'white'

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, buttonStyle]}
        onPress={toggleTheme}
      >
        <iconComponent name={iconName} size={24} color={iconColor} />
        <Text style={[styles.text, textStyle]}>
          {theme === 'light' ? 'Light' : 'Dark'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default DarkLightButton

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 3, // Only works on Android for shadow
    shadowOpacity: 0.2, // Only works on iOS for shadow
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 3 },
  },
  darkButton: {
    backgroundColor: 'green',
  },
  lightButton: {
    backgroundColor: 'lightgreen',
  },
  text: {
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  darkText: {
    color: 'white',
  },
  lightText: {
    color: 'black',
  },
})
