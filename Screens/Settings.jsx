import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
  Platform,
} from 'react-native'
import React from 'react'
import { useTheme } from '../Styles/theme'
import SettingsOptionCard from '../Components/Settings/SettingsOptionCard'
import SettingsSection from '../Components/Settings/SettingsSection'

const Settings = ({ navigation }) => {
  const { theme } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const styles = getStyles(theme, windowWidth)

  const handleContactUsPress = () => {
    const email = 'eisa.murwan@gmail.com'
    const subject = encodeURIComponent('Support Request')
    const mailtoURL = `mailto:${email}?subject=${subject}`

    Linking.openURL(mailtoURL).catch(err =>
      console.error('An error occurred', err)
    )
  }

  const sendBugReportEmail = () => {
    const email = 'eisa.murwan@gmail.com'
    const subject = encodeURIComponent('Bug Report')
    const body = encodeURIComponent(`Hello,
  
  I would like to report a bug that I encountered in the app. Here are the details:
  
  - What happened:
  - What I expected to happen:
  - Steps to reproduce the issue:
  - Additional information (device model, app version, etc.):
  
  Thank you for looking into this issue.
  
  Best regards,
  [Your Name]`)

    const url = `mailto:${email}?subject=${subject}&body=${body}`

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url)
      } else {
        console.log("Don't know how to open this URL: " + url)
      }
    })
  }

  return (
    <ScrollView style={styles.container}>
      <SettingsSection title={'ACCOUNT'}>
        <SettingsOptionCard
          title={'Change Password'}
          onPress={() => {
            navigation.navigate('ChangePassword')
          }}
        />
      </SettingsSection>

      <SettingsSection title={'SUPPORT'}>
        <SettingsOptionCard
          title={'Contact us'}
          onPress={handleContactUsPress}
        />
        <SettingsOptionCard
          title={'Report a bug'}
          onPress={sendBugReportEmail}
        />
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
