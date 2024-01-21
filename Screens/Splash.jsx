import React, { useEffect, useContext } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { FontLoadContext, useTheme } from '../Styles/theme'

const Splash = ({ navigation }) => {
  const fontsLoaded = useContext(FontLoadContext)
  const { theme } = useTheme()

  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(() => {
        navigation.navigate('Login')
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [fontsLoaded, navigation])

  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../Assets/images/icon.png')}
      />
      <Text style={styles.welcomeText}>
        Högskolan Kristianstads idrottsförening
      </Text>
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
      maxWidth: '70%',
      maxHeight: '70%',
    },
    welcomeText: {
      color: theme.colors.text,
      marginTop: 20,
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  })

export default Splash
