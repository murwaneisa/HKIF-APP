import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
} from 'react-native'
import React from 'react'
import { useTheme } from '../Styles/theme'
import SettingsOptionCard from '../Components/Settings/SettingsOptionCard'
import SettingsSection from '../Components/Settings/SettingsSection'

const Settings = () => {
  const { theme } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const styles = getStyles(theme, windowWidth)

  return (
    <ScrollView style={styles.container}>
      <SettingsSection title={'ACCOUNT'}>
        <SettingsOptionCard title={'Change Password'} onPress={() => {}} />
      </SettingsSection>

      <SettingsSection title={'SUPPORT'}>
        <SettingsOptionCard title={'Contact us'} onPress={() => {}} />
        <SettingsOptionCard title={'Report a bug'} onPress={() => {}} />
        <SettingsOptionCard title={'Rate this app'} onPress={() => {}} />
      </SettingsSection>

      <SettingsSection title={'DOCUMENTS'}>
        <SettingsOptionCard title={'Privacy policy'} onPress={() => {}} />
        <SettingsOptionCard title={'Terms of service'} onPress={() => {}} />
      </SettingsSection>

      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>SIGNOUT</Text>
      </Pressable>
    </ScrollView>
  )
}

const getStyles = (theme, windowWidth) => {
  const tabletHeight = windowWidth >= 720 ? '5%' : '8%'
  const tabletPadding = windowWidth >= 720 ? '10%' : '5%'
  const webWidth = windowWidth >= 900 ? '60%' : '85%'

  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.backgroundPrimary,
      flex: 1,
      paddingTop: 20,
      paddingHorizontal: Platform.select({
        ios: 20,
        android: 20,
        web: '25%',
      }),
    },
    button: {
      backgroundColor: theme.colors.primary200,
      padding: 15,
      borderRadius: 10,
    },
    buttonText: {
      fontFamily: 'Inter-SemiBold',
      textAlign: 'center',
    },
  })
}

export default Settings
