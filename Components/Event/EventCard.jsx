import React from 'react'
import {
  View,
  Text,
  Image,
  Pressable,
  Platform,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import DateFormatter from '../../Utilities/Helper/DateFormatter'

const EventCard = ({ data, onPress, webWidth, marginBottom }) => {
  return (
    <Pressable
      onPress={onPress}
      className="w-full bg-primary flex-row p-2.5 web:p-5 h-[125px] web:h-[180px] rounded-2xl shadow-sm"
      style={{ marginBottom }}
    >
      <View className="
        bg-black/20
        w-[33%] android:w-[35%] web:w-[40%]
        h-full rounded-2xl
        mr-2.5 web:mr-4
      ">
        <Image
          className="w-full h-full rounded-2xl"
          source={{
            uri: data.imageUrl,
          }}
          resizeMode='cover'
        />
      </View>
      <View className="flex-1 justify-between">
        <View>
          <Text className="
            font-['Inter-SemiBold'] font-bold
            text-[17px] web:text-[22px]
            mb-1.5 text-white
          ">
            {data.title}
          </Text>
          <View className="flex-row items-center mb-1.5">
            <Ionicons 
              name='location'
              className="
                text-white/80
                text-[16px] web:text-[18px]
                mr-1
              "
            />
            <Text className="
              font-['Inter-Regular']
              text-[14px] android:text-[14px] web:text-[18px]
              text-white
            ">
              Högskolan Kristianstad
            </Text>
          </View>
        </View>
        <View className="flex-row justify-between">
          <View className="flex-row items-center mb-1.5">
            <Ionicons 
              name='calendar'
              className="
                text-white/80
                text-[16px] web:text-[18px]
                mr-1
              "
            />
            <Text className="
              font-['Inter-Regular']
              text-[14px] android:text-[14px] web:text-[18px]
              text-white
            ">
              {DateFormatter.formatDate(data.startTime)}
            </Text>
          </View>
          <View className="flex-row items-center mb-1.5">
            <Ionicons 
              name='time'
              className="
                text-white/80
                text-[16px] web:text-[18px]
                mr-1
              "
            />
            <Text className="
              font-['Inter-Regular']
              text-[14px] android:text-[14px] web:text-[18px]
              text-white
            ">
              kl {DateFormatter.formatTime(data.startTime)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

export default EventCard
