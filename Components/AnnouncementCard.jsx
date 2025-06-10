import React from 'react'
import { View, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

const AnnouncementCard = ({ message }) => {
  return (
    <View className="bg-primary-200 ios:p-4 android:p-4 web:p-5 flex-row items-center rounded-2xl shadow-lg">
      <MaterialIcons 
        name="announcement" 
        className="pt-0.5 ios:text-2xl android:text-2xl web:text-[30px] text-white/80" 
      />
      <Text className="flex-1 font-['Inter-Medium'] ml-2.5 ios:text-sm android:text-sm web:text-lg -mt-0.5 text-white">
        {message}
      </Text>
    </View>
  )
}

export default AnnouncementCard
