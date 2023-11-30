import { useState, useEffect, createContext, useContext } from 'react'
import { Appearance } from 'react-native'
import * as Font from 'expo-font'

export const FontLoadContext = createContext()
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

  /*   if (!fontsLoaded) {
    return <Text>Loading...</Text>
  } */

  return (
    <FontLoadContext.Provider value={fontsLoaded}>
      {children}
    </FontLoadContext.Provider>
  )
}

export const ThemeContext = createContext()
const lightTheme = {
  colors: {
    primary: '#669D58',
    primary900: '#466C3D',
    primary500: '#466C3D',
    primary200: '#A9CAA1',
    secondary: '#3B3D3B',
    accent: '#F5F5F5',
    accentWhite: '#F5F5F5',
    background: '#FFFFFF',
    text: '#6B6B6B',
  },
}

const darkTheme = {
  colors: {
    primary: '#669D58',
    primary900: '#466C3D',
    primary500: '#466C3D',
    primary200: '#A9CAA1',
    secondary: '#3B3D3B',
    accent: '#3B3D3B',
    accentWhite: '#FFFFFF',
    background: '#121212',
    text: '#C4C4C4',
  },
}

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    Appearance.getColorScheme() === 'dark'
  )

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark')
    })

    return () => {
      subscription.remove()
    }
  }, [])

  const theme = isDarkMode ? darkTheme : lightTheme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
