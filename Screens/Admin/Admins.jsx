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
import { useNavigation } from '@react-navigation/native'
import RenderAdmins from '../../Components/Admin_comp/manager_comp/RenderAdmins'
import AddAdmin from '../../Components/Admin_comp/manager_comp/AddAdmin'

const Admins = () => {
  const windowWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, windowWidth)
  const [activeList, setActiveList] = useState('admins')
  const [user, setUser] = useState({ role: 'superAdmin' })
  const navigation = useNavigation()

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
    if (listName === 'createAdmin' && user.role !== 'superAdmin') {
      return // You can also use Alert.alert to inform the user they don't have permission
    }
    setActiveList(listName)
  }

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
            pressed && user.role === 'superAdmin' && styles.pressed,
          ]}
          onPress={() => handlePress('createAdmin')}
          disabled={user.role !== 'superAdmin'} // Disable if not super admin
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
