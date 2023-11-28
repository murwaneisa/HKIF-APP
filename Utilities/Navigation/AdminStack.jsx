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
import Users from '../../Screens/Admin/Users'
import Admins from '../../Screens/Admin/Admins'
import Events from '../../Screens/Admin/Events'
import Activities from '../../Screens/Admin/Activities'

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

const AdminStack = () => {
  const { theme } = useTheme()

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerLeft: () => customHeaderLeft('Users'),
        headerRight: () => notificationBell(),
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
          backgroundColor: theme.colors.background, // Set the background color for the drawer
        },
      }}
    >
      <Drawer.Screen
        name='Home'
        component={Home}
        options={{
          headerLeft: () => customHeaderLeft('Home'),
          drawerIcon: ({ color }) => (
            <Ionicons name='home-outline' size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name='Users'
        component={Users}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name='people-outline' size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name='Admins'
        component={Admins}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name='shield-checkmark-outline' size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name='Activities'
        component={Activities}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name='football-outline' size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name='Events'
        component={Events}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name='calendar-outline' size={22} color={color} />
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

export default AdminStack