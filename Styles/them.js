import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'
import * as Font from 'expo-font'

export const ColorTheme = {
  colors: {
    primary: '#669D58',
    secondary: '#3B3D3B',
    accent: '#282525',
    accentWhite: '#FFFFFF',
  },
}

export const FontLoader = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Inter-Black': require('../Assets/fonts/Inter-Black.ttf'),
        'Inter-Bold': require('../Assets/fonts/Inter-Bold.ttf'),
        'Inter-ExtraBlack': require('../Assets/fonts/Inter-ExtraBold.ttf'),
        'Inter-Light': require('../Assets/fonts/Inter-Light.ttf'),
        'Inter-ExtraLight': require('../Assets/fonts/Inter-ExtraLight.ttf'),
        'Inter-Medium': require('../Assets/fonts/Inter-Medium.ttf'),
        'Inter-SemiBold': require('../Assets/fonts/Inter-SemiBold.ttf'),
        'Inter-Regular': require('../Assets/fonts/Inter-Regular.ttf'),
        'Inter-Thin': require('../Assets/fonts/Inter-Thin.ttf'),
        // ... other fonts
      })
      setFontsLoaded(true)
    }
    loadFonts()
  }, [])

  if (!fontsLoaded) {
    return <Text>Loading...</Text>
  }

  return children
}
