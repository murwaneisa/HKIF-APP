import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import { useTheme } from '../../Styles/theme'
import { StyleSheet } from 'react-native'

function GoogleButton({
  children,
  onPress,
  paddingVertical,
  paddingHorizontal,
}) {
  const { theme } = useTheme()
  const styles = getStyles(theme, paddingVertical, paddingHorizontal)
  GoogleSignin.configure({
    webClientId: process.env.WEB_CLIENT_ID, // client ID of type WEB from Google Console
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    iosClientId: process.env.IOS_CLIENT_ID,
  })
  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={async () => {
        try {
          console.log('1')
          await GoogleSignin.hasPlayServices()
          console.log('2')
          const userInfo = await GoogleSignin.signIn()
          // setState({ userInfo })
          console.log('3')
          console.log(JSON.stringify(userInfo, null, 2))
        } catch (error) {
          console.error(JSON.stringify(error))
          // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          //   // user cancelled the login flow
          // } else if (error.code === statusCodes.IN_PROGRESS) {
          //   // operation (e.g. sign in) is in progress already
          // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          //   // play services not available or outdated
          // } else {
          //   // some other error happened
          // }
        }
      }}
    />
  )
}

const getStyles = (theme, paddingHorizontal, paddingVertical) => {
  return StyleSheet.create({
    buttonOuterContainer: {
      borderColor: theme.colors.primary,
      borderRadius: 28,
      overflow: 'hidden',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderWidth: 2, // Set the thickness of the outline
      // Set the color of the outline
      backgroundColor: 'transparent',
      padding: 4,
    },
    buttonInnerContainer: {
      flexDirection: 'row', // Align children horizontally
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    buttonText: {
      fontFamily: 'Inter-SemiBold',
      color: theme.colors.text,
      paddingLeft: '4%',
    },
    pressed: {
      opacity: 0.75,
    },
  })
}

export default GoogleButton
