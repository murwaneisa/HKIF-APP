import React, { useState } from 'react'
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native'
import { useTheme } from '../../Styles/theme'
import RenderMembers from './Users_comp/RenderMembers'
import RenderRequests from './Users_comp/RenderRequests'

const CustomManage = ({}) => {
  const windowWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, windowWidth)
  const [activeList, setActiveList] = useState('members')
  const [user, setUser] = useState({ role: 'superAdmin' })

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
    if (listName === 'requests' && user.role !== 'superAdmin') {
      return // You can also use Alert.alert to inform the user they don't have permission
    }
    setActiveList(listName)
  }

  let content
  switch (activeList) {
    case 'members':
      content = renderMembers ? RenderMembers() : null
      break
    case 'requests':
      content = renderRequests ? RenderRequests() : null
      break
    default:
      content = null
  }

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
            pressed && user.role === 'superAdmin' && styles.pressed,
          ]}
          onPress={() => handlePress('requests')}
          disabled={user.role !== 'superAdmin'} // Disable if not super admin
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
      {content}
    </View>
  )
}

const getStyles = (theme, windowWidth) => {
  const tabletHeight = windowWidth >= 720 ? '5%' : '8%'
  const webWidth = windowWidth >= 900 ? '60%' : '85%'
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundSecondary,
      alignItems: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      backgroundColor: theme.colors.accent2,
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
      color: theme.colors.text,
      fontFamily: 'Inter-SemiBold',
    },
    pressed: {
      opacity: 0.5,
    },
  })
}

export default CustomManage
