import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawer from './CustomDrawer'
import { Platform, StyleSheet } from 'react-native'

const Drawer = createDrawerNavigator()

const DrawerNavigator = ({ headerLeft, headerRight, children }) => {
  return (
    <Drawer.Navigator
      useLegacyImplementation={false}
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerLeft: headerLeft,
        headerRight: headerRight,
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTitleStyle: {
          color: '#6B6B6B',
          fontFamily: 'Inter-Medium',
        },
        headerTitleAlign: 'center',
        drawerActiveBackgroundColor: '#669D58',
        drawerActiveTintColor: '#FFFFFF',
        drawerInactiveTintColor: '#6B6B6B',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Inter-Medium',
          fontSize: Platform.OS === 'web' ? 20 : Platform.OS === 'ios' ? 16 : 14,
        },
        drawerStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      {children}
    </Drawer.Navigator>
  )
}

const getStyles = () =>
  StyleSheet.create({
    headerStyle: {
      backgroundColor: 'gray',
    },
    headerTitleStyle: {
      color: '#6B6B6B',
    },
    drawerLabelStyle: {
      marginLeft: -25,
      fontFamily: 'Inter-Medium',
      fontSize: Platform.select({
        ios: 16,
        android: 14,
        web: 20,
      }),
    },
    drawerStyle: {
      backgroundColor: 'green',
    },
  })

export default DrawerNavigator
