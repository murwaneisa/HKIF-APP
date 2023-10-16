// WelcomeScreen.js
import React, { useEffect, useContext } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { FontLoadContext, useTheme } from '../Styles/theme'

const Welcome = ({ navigation }) => {
  const fontsLoaded = useContext(FontLoadContext)
  const { theme } = useTheme()

  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(() => {
        navigation.navigate('Home')
      }, 3000) // 3 seconds

      return () => clearTimeout(timer) // Cleanup the timer
    }
  }, [fontsLoaded, navigation])

  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Högskolan Kristianstads idrottsförening
      </Text>
      {/* Optionally add a button to navigate to the main app */}
    </View>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primary,
    },
    logo: {
      width: 150,
      height: 150,
    },
    welcomeText: {
      fontFamily: 'Inter-SemiBold',
      color: theme.colors.text,
      marginTop: 20,
      fontSize: 24,
      fontWeight: 'bold',
    },
  })

export default Welcome
