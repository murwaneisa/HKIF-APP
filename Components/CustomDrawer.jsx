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

const Profile = () => {
  const navigation = useNavigation()
  const { theme } = useTheme()
  return (
    <View
      style={{
        height: 86, // Slightly larger than the image
        width: 86, // Slightly larger than the image
        borderRadius: 43, // Half of the new width and height
        borderWidth: 3, // Width of the border
        borderColor: theme.colors.primary, // Color of the border
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
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#8200d6' }}
      >
        <ImageBackground
          source={require('../Assets/images/icon.png')}
          style={{ padding: 20 }}
        >
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
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Regular',
                marginRight: 5,
              }}
            >
              280 Coins
            </Text>
            <FontAwesome5 name='coins' size={14} color='#fff' />
          </View>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name='share-social-outline' size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}
            >
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name='exit-outline' size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Inter-Medium',
                marginLeft: 5,
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
