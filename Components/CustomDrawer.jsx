import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  StyleSheet,
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
  const styles = getStyles(theme)
  return (
    <View style={{}}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D',
          }}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  )
}

const CustomDrawer = props => {
  const { theme } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const styles = getStyles(theme)
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: theme.colors.primary }}
      >
        <View style={styles.container}>
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
          <View>
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
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.background,
            paddingTop: Platform.select({
              ios: 10,
              android: 8,
              web: 10,
            }),
          }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomContainer}>
        <DarkLightSwitch />
        <TouchableOpacity onPress={() => {}} style={styles.bottomTouchable}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons
              name='share-social-outline'
              size={22}
              color={theme.colors.text}
            />
            <Text style={styles.bottomItemText}>Share the app</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.bottomTouchable}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name='exit-outline' size={22} color={theme.colors.text} />
            <Text style={styles.bottomItemText}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const getStyles = (theme, windowWidth) => {
  const tabletPadding = windowWidth >= 720 ? 15 : 0
  const webWidth = windowWidth >= 900 ? '60%' : '85%'
  return StyleSheet.create({
    container: {
      flexDirection: Platform.select({
        ios: 'column',
        android: 'column',
        web: 'column',
      }),
      paddingVertical: Platform.select({
        ios: 20,
        android: 8,
        web: 20,
      }),
      paddingHorizontal: Platform.select({
        ios: 20,
        android: 17,
        web: 20,
      }),
      /*     paddingTop: Platform.select({
        android: 70,
      }),
      paddingBottom: Platform.select({
        android: 7,
      }), */
    },
    image: {
      height: 80,
      width: 80,
      marginRight: 10,
      borderRadius: 45, // Half of the new width and height
      borderWidth: 3, // Width of the border
      borderColor: theme.colors.primary900, // Color of the border
    },
    bottomContainer: {
      paddingHorizontal: Platform.select({
        ios: 20,
        android: 20,
        web: 30,
      }),
      paddingTop: Platform.select({
        ios: 20,
        android: 10,
        web: 30,
      }),
      paddingBottom: Platform.select({
        ios: 20,
        android: 20,
        web: 30,
      }),
      borderTopWidth: 1,
      borderTopColor: '#ccc',
    },
    bottomItemText: {
      fontFamily: 'Inter-Medium',
      fontSize: Platform.select({
        ios: 16,
        android: 14,
        wed: 20,
      }),
      marginLeft: 5,
      color: theme.colors.text,
    },
    bottomTouchable: {
      paddingVertical: 10,
    },
  })
}

export default CustomDrawer
