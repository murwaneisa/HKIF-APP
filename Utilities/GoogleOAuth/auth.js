import { useEffect, useState } from 'react'
import * as WebBrowser from 'expo-web-browser'
import {
  makeRedirectUri,
  useAuthRequest,
  ResponseType,
} from 'expo-auth-session'

WebBrowser.maybeCompleteAuthSession()

export function useGoogleAuth() {
  const [authData, setAuthData] = useState(null)
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      androidClientId: process.env.ANDROID_CLIENT_ID,
      iosClientId: 'YOUR_IOS_CLIENT_ID',
      webClientId: process.env.WEB_CLIENT_ID,
      clientId: process.env.WEB_CLIENT_ID,
      scopes: ['openid', 'profile', 'email'],
      redirectUri: makeRedirectUri({
        useProxy: true,
      }),
    },
    {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenEndpoint: 'https://oauth2.googleapis.com/token',
      revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
    }
  )

  useEffect(() => {
    if (response?.type === 'success') {
      setAuthData(response.authentication)
      // You can also do any post-login logic here
    }
  }, [response])

  return {
    request,
    authData,
    promptGoogleSignIn: () => {
      if (request) {
        promptAsync()
      }
    },
  }
}
