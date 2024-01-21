import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawer from '../../Components/Navigation/CustomDrawer'
import { useTheme } from '../../Styles/theme'
import { Platform, StyleSheet } from 'react-native'

const Drawer = createDrawerNavigator()

const DrawerNavigator = ({ headerLeft, headerRight, children }) => {
  const { theme } = useTheme()
  const styles = getStyles(theme)

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerLeft: headerLeft,
        headerRight: headerRight,
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        headerTitleAlign: 'center',
        drawerActiveBackgroundColor: theme.colors.primary200,
        drawerActiveTintColor: theme.colors.primary900,
        drawerInactiveTintColor: theme.colors.text,
        drawerLabelStyle: styles.drawerLabelStyle,
        drawerStyle: styles.drawerStyle,
      }}
    >
      {children}
    </Drawer.Navigator>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    headerStyle: {
      backgroundColor: theme.colors.accent,
    },
    headerTitleStyle: {
      color: theme.colors.text,
    },
    drawerLabelStyle: {
      marginLeft: -25,
      fontFamily: 'Inter-Medium',
      fontSize: Platform.select({
        ios: 16,
        android: 14,
        wed: 20,
      }),
    },
    drawerStyle: {
      backgroundColor: theme.colors.backgroundPrimary,
    },
  })

export default DrawerNavigator
