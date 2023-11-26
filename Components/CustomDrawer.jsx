import React from 'react'
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'

import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../Styles/theme'
import Badge from '../Utilities/UI/Badge'
import DarkLightSwitch from '../Utilities/UI/DarkLightButton'

const Profile = () => {
  const navigation = useNavigation()
  const { theme } = useTheme()
  return (
    <View
      style={{
        height: 70, // Slightly larger than the image
        width: 86, // Slightly larger than the image
        borderRadius: 43, // Half of the new width and height
        borderWidth: 3, // Width of the border
        borderColor: theme.colors.primary900, // Color of the border
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image
          source={require('../Assets/images/login.png')}
          style={{
            height: 80,
            width: 80,
            borderRadius: 40,
          }}
        />
      </TouchableOpacity>
    </View>
  )
}

const CustomDrawer = props => {
  const { theme } = useTheme()
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: theme.colors.primary }}
      >
        <View style={{ padding: 20 }}>
          {Profile()}
          {/*       <Image
            source={require('../Assets/images/sports_icon.png')}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 10,
            }}
          /> */}
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}
          >
            John Doe
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Badge>Full Membership</Badge>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.background,
            paddingTop: 10,
          }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <DarkLightSwitch />
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons
              name='share-social-outline'
              size={22}
              color={theme.colors.text}
            />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Inter-Medium',
                marginLeft: 5,
                color: theme.colors.text,
              }}
            >
              Share the app
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name='exit-outline' size={22} color={theme.colors.text} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Inter-Medium',
                marginLeft: 5,
                color: theme.colors.text,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CustomDrawer
