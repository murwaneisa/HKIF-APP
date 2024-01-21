import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Settings from '../../Screens/Settings'
import Home from '../../Screens/Home'
import Users from '../../Screens/Admin/Users'
import Admins from '../../Screens/Admin/Admins'
import Events from '../../Screens/Admin/Events'
import Activities from '../../Screens/Admin/Activities'
import { createStackNavigator } from '@react-navigation/stack'
import MemberDetails from '../../Screens/Admin/MemberDetails'
import AddEvent from '../../Components/Admin_comp/Event_comp/AddEvent'
import CreateActivity from '../../Components/Admin_comp/Activity_comp/CreateActivity'
import AddLeader from '../../Components/Admin_comp/Activity_comp/AddLeader'
import AddAdmin from '../../Components/Admin_comp/manager_comp/AddAdmin'
import HeaderLeft from '../../Components/Navigation/HeaderLeft'
import HeaderRight from '../../Components/Navigation/HeaderRight'
import DrawerNavigator from '../../Components/Navigation/DrawerNavigator'
import StackNavigator from '../../Components/Navigation/StackNavigator'
import EventDetails from '../../Screens/EventDetails'
import Activity from '../../Screens/Activity'
import EventUsers from '../../Screens/EventUsers'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const AdminStack = () => {
  return (
    <StackNavigator headerLeft={() => HeaderLeft()}>
      <Stack.Screen
        name='HomeMenu'
        options={{
          headerShown: false,
        }}
        component={DrawerMenu}
      />
      <Stack.Screen
        name='MemberDetails'
        options={{ headerTitle: 'Member Details' }}
        component={MemberDetails}
      />
      <Stack.Screen
        name='AddEvent'
        options={{ headerTitle: 'Create Event' }}
        component={AddEvent}
      />
      <Stack.Screen
        name='AddActivity'
        options={{ headerTitle: 'Edit Activity' }}
        component={CreateActivity}
      />
      <Stack.Screen
        name='AddLeader'
        options={{ headerTitle: 'Edit Leader' }}
        component={AddLeader}
      />
      <Stack.Screen
        name='AddAdmin'
        options={{ headerTitle: 'Edit Admin' }}
        component={AddAdmin}
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
      {/* Duplicate screen names in users & admin "Events" */}
      <Stack.Screen
        name='Events'
        component={Events}
        options={{
          headerTitle: 'Upcoming Events',
        }}
      />
    </StackNavigator>
  )
}

const DrawerMenu = () => {
  return (
    <DrawerNavigator
      headerLeft={() => HeaderLeft()}
      headerRight={() => HeaderRight()}
    >
      <Drawer.Screen
        name='Home'
        component={Home}
        options={{
          headerLeft: () => HeaderLeft('Home'),
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
    </DrawerNavigator>
  )
}

export default AdminStack
