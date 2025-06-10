import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import Badge from '../../Utilities/UI/Badge'
import DarkLightSwitch from '../../Utilities/UI/DarkLightButton'
import { userLogout } from '../../Utilities/Redux/Actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { adminLogout } from '../../Utilities/Redux/Actions/adminActions'

const Profile = () => {
  const navigation = useNavigation()

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D',
          }}
          className="h-20 w-20 mr-2.5 rounded-[45px] border-3 border-primary-900"
        />
      </TouchableOpacity>
    </View>
  )
}

const CustomDrawer = props => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.currentUser)
  const admin = useSelector(state => state.admin.currentAdmin)

  const handleLogout = async () => {
    if (user) {
      dispatch(userLogout())
    } else if (admin) {
      dispatch(adminLogout())
    }
  }

  return (
    <View className="flex-1">
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#669D58' }}
      >
        <View className="flex-col ios:py-5 android:py-2 web:py-5 ios:px-5 android:px-4 web:px-5">
          {Profile()}
          <View>
            <Text className="text-white text-lg font-['Roboto-Medium'] mb-1.5">
              John Doe
            </Text>
            <View className="flex-row">
              <Badge>Full Membership</Badge>
            </View>
          </View>
        </View>
        <View className="flex-1 bg-background-primary ios:pt-2.5 android:pt-2 web:pt-2.5">
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View className="ios:px-5 android:px-5 web:px-7 ios:pt-5 android:pt-2.5 web:pt-7 ios:pb-5 android:pb-5 web:pb-7 border-t border-[#ccc]">
        <DarkLightSwitch />
        <TouchableOpacity onPress={() => {}} className="py-2.5">
          <View className="flex-row items-center">
            <Ionicons
              name="share-social-outline"
              size={22}
              color="#6B6B6B"
              className="dark:text-[#C4C4C4]"
            />
            <Text className="font-['Inter-Medium'] ios:text-base android:text-sm web:text-xl ml-1.5 text-text-primary">
              Share the app
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} className="py-2.5">
          <View className="flex-row items-center">
            <Ionicons
              name="exit-outline"
              size={22}
              color="#6B6B6B"
              className="dark:text-[#C4C4C4]"
            />
            <Text className="font-['Inter-Medium'] ios:text-base android:text-sm web:text-xl ml-1.5 text-text-primary">
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CustomDrawer
