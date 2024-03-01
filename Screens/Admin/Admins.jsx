import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  Dimensions,
  Alert,
} from 'react-native'
import { useTheme } from '../../Styles/theme'
import { useNavigation } from '@react-navigation/native'
import RenderAdmins from '../../Components/Admin_comp/manager_comp/RenderAdmins'
import AddAdmin from '../../Components/Admin_comp/manager_comp/AddAdmin'

import { useDispatch, useSelector } from 'react-redux'
import { getAdmins } from '../../Utilities/Redux/Actions/adminActions'

const Admins = () => {
  const windowWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, windowWidth)
  const [activeList, setActiveList] = useState('admins')
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const admin = useSelector(state => state.admin.currentAdmin)
  const [user, setUser] = useState(admin.role.includes('SUPERADMIN'))

  const getButtonStyle = listName => ({
    flex: 1,
    backgroundColor:
      activeList === listName ? theme.colors.primary : theme.colors.accent2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  })

  const getButtonTextStyle = listName => ({
    color: activeList === listName ? 'white' : theme.colors.text,
  })

  const handlePress = listName => {
    if (listName === 'createAdmin' && !user) {
      Alert.alert(
        'Access Denied', // Title of the alert
        'You do not have permission to view this section.', // Message of the alert
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }, // Button to dismiss the alert
        ]
      )
      return
    }
    setActiveList(listName)
  }
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        dispatch(getAdmins())
      } catch (error) {
        console.error('Error fetching admins:', error)
      }
    }

    fetchAdmins()
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            getButtonStyle('admins'),
            pressed && styles.pressed,
          ]}
          onPress={() => setActiveList('admins')}
        >
          {({ pressed }) => (
            <Text
              style={[
                styles.buttonText,
                getButtonTextStyle('admins'),
                pressed && styles.pressedText,
              ]}
            >
              Admins
            </Text>
          )}
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            getButtonStyle('createAdmin'),
            pressed && user && styles.pressed,
          ]}
          onPress={() => handlePress('createAdmin')}
          /*  disabled={!user} // Disable if not super admin */
        >
          {({ pressed }) => (
            <Text
              style={[
                styles.buttonText,
                getButtonTextStyle('createAdmin'),
                pressed && styles.pressedText,
              ]}
            >
              Create admin
            </Text>
          )}
        </Pressable>
      </View>

      {activeList === 'admins' ? (
        <RenderAdmins />
      ) : (
        // ... render your members list component here
        <AddAdmin />
        // ... render your requests list component here
      )}
    </View>
  )
}

const getStyles = (theme, windowWidth) => {
  const tabletHeight = windowWidth >= 720 ? '5%' : '8%'
  const tabletPadding = windowWidth >= 720 ? '10%' : '5%'
  const webWidth = windowWidth >= 900 ? '60%' : '85%'
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundSecondary,
      paddingHorizontal: Platform.select({
        ios: tabletPadding,
        android: tabletPadding,
        web: '20%',
      }),
    },

    buttonContainer: {
      flexDirection: 'row',
      backgroundColor: theme.colors.accent2,
      borderRadius: 8,

      height: Platform.select({
        ios: '6%',
        android: tabletHeight,
        web: '8%',
      }),
      marginVertical: 20,
    },
    buttonText: {
      color: theme.colors.text,
      fontFamily: 'Inter-SemiBold',
    },
    pressed: {
      opacity: 0.5,
    },
  })
}

export default Admins
