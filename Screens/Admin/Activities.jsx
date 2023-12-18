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
import RenderPrevious from '../../Components/Admin_comp/Event_comp/RenderPrevious'
import RenderActivities from '../../Components/Admin_comp/Activity_comp/RenderActivities'
import CreateActivity from '../../Components/Admin_comp/Activity_comp/CreateActivity'

const Activities = () => {
  const windowWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, windowWidth)
  const [activeList, setActiveList] = useState('Activities')
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
    if (listName === 'createActivity' && user.role !== 'superAdmin') {
      return // You can also use Alert.alert to inform the user they don't have permission
    }
    setActiveList(listName)
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            getButtonStyle('Activities'),
            pressed && styles.pressed,
          ]}
          onPress={() => setActiveList('Activities')}
        >
          {({ pressed }) => (
            <Text
              style={[
                styles.buttonText,
                getButtonTextStyle('Activities'),
                pressed && styles.pressedText,
              ]}
            >
              Activities
            </Text>
          )}
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            getButtonStyle('createActivity'),
            pressed && user.role === 'superAdmin' && styles.pressed,
          ]}
          onPress={() => handlePress('createActivity')}
          disabled={user.role !== 'superAdmin'} // Disable if not super admin
        >
          {({ pressed }) => (
            <Text
              style={[
                styles.buttonText,
                getButtonTextStyle('createActivity'),
                pressed && styles.pressedText,
              ]}
            >
              Create activity
            </Text>
          )}
        </Pressable>
      </View>

      {activeList === 'Activities' ? (
        <RenderActivities />
      ) : (
        // ... render your members list component here
        <CreateActivity />
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

export default Activities
