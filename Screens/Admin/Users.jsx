import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import RenderRequests from '../../Components/Admin_comp/Users_comp/RenderRequests'
import RenderMembers from '../../Components/Admin_comp/Users_comp/RenderMembers'
import { Alert } from 'react-native'
import { getUsersInfo } from '../../Utilities/Axios/user'
import { addUsers } from '../../Utilities/Redux/Actions/userActions'

const Users = () => {
  const windowWidth = Dimensions.get('window').width
  const dispatch = useDispatch()
 
  const styles = getStyles(windowWidth)
  const [activeList, setActiveList] = useState('members')
  const admin = useSelector(state => state.admin.currentAdmin)
  const [user, setUser] = useState(admin.role.includes('SUPERADMIN'))

  const getButtonStyle = listName => ({
    flex: 1,
    backgroundColor:
      activeList === listName ? 'green' : 'gray',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  })

  const getButtonTextStyle = listName => ({
    color: activeList === listName ? 'white' : '#6B6B6B',
  })

  const handlePress = listName => {
    if (listName === 'requests' && !user) {
      Alert.alert(
        'Access Denied', // Title of the alert
        'You do not have permission to view this section.', // Message of the alert
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }, // Button to dismiss the alert
        ]
      )
      return // You can also use Alert.alert to inform the user they don't have permission
    }
    setActiveList(listName)
  }

  const [userData, setUserData] = useState(null) // State to store user data

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsersInfo()
        console.log('the data ', data)
        dispatch(addUsers(data.data))
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, []) // Empty dependency array means this effect runs once on mount

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            getButtonStyle('members'),
            pressed && styles.pressed,
          ]}
          onPress={() => setActiveList('members')}
        >
          {({ pressed }) => (
            <Text
              style={[
                styles.buttonText,
                getButtonTextStyle('members'),
                pressed && styles.pressedText,
              ]}
            >
              Members
            </Text>
          )}
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            getButtonStyle('requests'),
            pressed && user && styles.pressed,
          ]}
          onPress={() => handlePress('requests')}
          /*  disabled={!user} // Disable if not super admin */
        >
          {({ pressed }) => (
            <Text
              style={[
                styles.buttonText,
                getButtonTextStyle('requests'),
                pressed && styles.pressedText,
              ]}
            >
              Requests
            </Text>
          )}
        </Pressable>
      </View>
      {activeList === 'members' ? (
        <RenderMembers />
      ) : (
        // ... render your members list component here
        <RenderRequests />
        // ... render your requests list component here
      )}
    </View>
  )
}

const getStyles = windowWidth => {
  const tabletHeight = windowWidth >= 720 ? '5%' : '8%'
  const webWidth = windowWidth >= 900 ? '60%' : '85%'
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'green',
      alignItems: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      backgroundColor: 'gray',
      borderRadius: 8,
      width: Platform.select({
        ios: '90%',
        android: '90%',
        web: webWidth,
      }),
      height: Platform.select({
        ios: '6%',
        android: tabletHeight,
        web: '8%',
      }),
      marginVertical: 20,
    },
    buttonText: {
      color: '#6B6B6B',
      fontFamily: 'Inter-SemiBold',
    },
    pressed: {
      opacity: 0.5,
    },
  })
}

export default Users
