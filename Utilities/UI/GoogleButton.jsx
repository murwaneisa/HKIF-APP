import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import { useTheme } from '../../Styles/theme'

function GoogleButton({ setUserInfo }) {
  const { theme } = useTheme()
  GoogleSignin.configure({
    webClientId: process.env.WEB_CLIENT_ID,
    offlineAccess: true,
    iosClientId: process.env.IOS_CLIENT_ID,
  })
  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={async () => {
        try {
          await GoogleSignin.hasPlayServices()
          const userInfo = await GoogleSignin.signIn()
          setUserInfo(userInfo)
          // console.log(JSON.stringify(userInfo, null, 2))
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

export default GoogleButton
