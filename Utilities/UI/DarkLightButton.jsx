import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { useColorScheme } from 'nativewind'

const DarkLightSwitch = () => {
  const { colorScheme, setColorScheme } = useColorScheme()
  const isDarkMode = colorScheme === 'dark'

  const textColor = isDarkMode ? '#C4C4C4' : '#6B6B6B'
  const iconName = isDarkMode ? 'white-balance-sunny' : 'moon'
  const IconComponent = isDarkMode ? MaterialCommunityIcons : Feather
  const text = isDarkMode ? 'Light Mode' : 'Dark Mode'

  const toggleTheme = () => {
    setColorScheme(isDarkMode ? 'light' : 'dark')
  }

  return (
    <TouchableOpacity
      className='flex-row w-[136px] h-10 items-center justify-start'
      onPress={toggleTheme}
    >
      {/* Icon */}
      <IconComponent name={iconName} size={24} color={textColor} />
      {/* Text */}
      <Text className="ml-1 font-['Inter-Medium'] text-text-primary dark:text-[#C4C4C4] ios:text-base android:text-sm web:text-xl">
        {text}
      </Text>
    </TouchableOpacity>
  )
}

export default DarkLightSwitch
