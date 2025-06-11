import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Profile from '../../Screens/Profile'
import Message from '../../Screens/Message'
import Settings from '../../Screens/Settings'
import Home from '../../Screens/Home'
import Register from '../../Screens/Register'
import { Octicons } from '@expo/vector-icons'
import Organization from '../../Screens/Organization'
import Activity from '../../Screens/Activity'
import { createStackNavigator } from '@react-navigation/stack'
import EventUsers from '../../Screens/EventUsers'
import EditProfile from '../../Screens/EditProfile'
import Events from '../../Screens/Events'
import EventDetails from '../../Screens/EventDetails'
import HeaderLeft from '../../Components/Navigation/HeaderLeft'
import HeaderRight from '../../Components/Navigation/HeaderRight'
import CustomDrawer from '../../Components/Navigation/CustomDrawer'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <HeaderLeft />,
        headerRight: () => <HeaderRight />,
      }}
    >
      <Stack.Screen
        name='Home'
        component={Home}
        options={{
          headerTitle: 'Home',
        }}
      />
      <Stack.Screen
        name='EventDetails'
        component={EventDetails}
        options={({ route }) => ({
          headerTitle: route.params?.event.title || 'Event Details',
        })}
      />
      <Stack.Screen
        name='Activity'
        component={Activity}
        options={({ route }) => ({
          headerTitle: route.params?.activity.title || 'Activity',
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
      <Stack.Screen
        name='Events'
        component={Events}
        options={{
          headerTitle: 'Upcoming Events',
        }}
      />
    </Stack.Navigator>
  )
}

const UserStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#669D58',
        drawerActiveTintColor: '#FFFFFF',
        drawerInactiveTintColor: '#6B6B6B',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Inter-Medium',
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name='Home'
        component={MainStack}
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
