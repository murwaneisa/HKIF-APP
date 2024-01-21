import React from 'react'
import { useTheme } from '../../Styles/theme'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const StackNavigator = ({ headerLeft, children }) => {
  const { theme } = useTheme()
  const styles = getStyles(theme)

  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: headerLeft,
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
    </Stack.Navigator>
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
      fontSize: 15,
    },
    drawerStyle: {
      backgroundColor: theme.colors.backgroundPrimary,
    },
  })

export default StackNavigator
