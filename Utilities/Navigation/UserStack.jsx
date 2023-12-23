import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import Ionicons from 'react-native-vector-icons/Ionicons'

import Profile from '../../Screens/Profile'
import Message from '../../Screens/Message'
import Settings from '../../Screens/Settings'
import Home from '../../Screens/Home'
import CustomDrawer from '../../Components/CustomDrawer'
import { useTheme } from '../../Styles/theme'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Register from '../../Screens/Register'
import { Octicons } from '@expo/vector-icons'
import Organization from '../../Screens/Organization'
import Event from '../../Screens/Event'
import Activity from '../../Screens/Activity'
import { createStackNavigator } from '@react-navigation/stack'
import EventUsers from '../../Screens/EventUsers'
import EditProfile from '../../Screens/EditProfile'

const customHeaderLeft = routeName => {
  const navigation = useNavigation()
  const { theme } = useTheme()

  if (routeName === 'Home') {
    return (
      <View
        style={{
          marginLeft: 15,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name='menu' size={38} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
    )
  } else {
    return (
      <View
        style={{
          marginLeft: 15,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name='arrow-back-outline'
            size={38}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const hamburgerMenu = () => {
  const navigation = useNavigation()
  const { theme } = useTheme()
  return (
    <View
      style={{
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name='menu' size={38} color={theme.colors.text} />
      </TouchableOpacity>
    </View>
  )
}

const notificationBell = () => {
  const navigation = useNavigation()
  const { theme } = useTheme()
  return (
    <View
      style={{
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Ionicons
          name='notifications-outline'
          size={38}
          color={theme.colors.text}
        />
      </TouchableOpacity>
    </View>
  )
}

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

const UserStack = () => {
  const { theme } = useTheme()
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => customHeaderLeft('Users'),
        headerStyle: {
          backgroundColor: theme.colors.accent, // Use the theme for styling
        },
        headerTitleStyle: {
          color: theme.colors.text,
        },
        headerTitleAlign: 'center',
        drawerActiveBackgroundColor: theme.colors.primary200,
        drawerActiveTintColor: theme.colors.primary900,
        drawerInactiveTintColor: theme.colors.text,
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Inter-Medium',
          fontSize: 15,
        },
        drawerStyle: {
          backgroundColor: theme.colors.backgroundPrimary, // Set the background color for the drawer
        },
      }}
    >
      <Stack.Screen
        name='HomeMenu'
        options={{
          headerShown: false,
        }}
        component={MenuStack}
      />
      <Stack.Screen name='Event' component={Event} />
      <Stack.Screen
        name='Activity'
        component={Activity}
        options={({ route }) => ({
          headerTitle: route.params?.title || 'Activity',
        })}
      />
      <Stack.Screen name='EventUsers' component={EventUsers} />
      <Stack.Screen
        name='EditProfile'
        component={EditProfile}
        options={({ route }) => ({
          headerTitle: `Edit ${route.params?.type}` || 'Edit Profile',
        })}
      />
    </Stack.Navigator>
  )
}

const MenuStack = () => {
  const { theme } = useTheme()

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerRight: () => notificationBell(),
        headerLeft: () => hamburgerMenu(),
        headerStyle: {
          backgroundColor: theme.colors.accent, // Use the theme for styling
        },
        headerTitleStyle: {
          color: theme.colors.text,
        },
        headerTitleAlign: 'center',
        drawerActiveBackgroundColor: theme.colors.primary200,
        drawerActiveTintColor: theme.colors.primary900,
        drawerInactiveTintColor: theme.colors.text,
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Inter-Medium',
          fontSize: 15,
        },
        drawerStyle: {
          backgroundColor: theme.colors.backgroundPrimary, // Set the background color for the drawer
        },
      }}
    >
      <Drawer.Screen
        name='Home'
        component={Home}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name='home-outline' size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name='Profile'
        component={Profile}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name='person-outline' size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name='Messages'
        component={Message}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name='chatbox-ellipses-outline' size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name='Become a member'
        component={Register}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name='person-add-outline' size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name='About organization'
        component={Organization}
        options={{
          drawerIcon: ({ color }) => (
            <Octicons name='organization' size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name='Settings'
        component={Settings}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name='settings-outline' size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}

export default UserStack
