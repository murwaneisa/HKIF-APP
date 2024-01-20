import AsyncStorage from '@react-native-async-storage/async-storage'

// Storing the token
export const storeAccessToken = async token => {
  try {
    await AsyncStorage.setItem('accessToken', token)
  } catch (e) {
    console.error('Error storing the access token', e)
  }
}

// Retrieving the token
export const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem('accessToken')
  } catch (e) {
    console.error('Error retrieving the access token', e)
    return null
  }
}

// Storing the token
export const storeRefreshToken = async token => {
  try {
    await AsyncStorage.setItem('refreshToken', token)
  } catch (e) {
    console.error('Error storing the refresh token', e)
  }
}

// Retrieving the token
export const getRefreshToken = async () => {
  try {
    return await AsyncStorage.getItem('refreshToken')
  } catch (e) {
    console.error('Error retrieving the refresh token', e)
    return null
  }
}

// Storing the userID
export const storeUserID = async userId => {
  try {
    await AsyncStorage.setItem('userID', userId.toString())
  } catch (error) {
    console.error('Error storing user ID:', error)
  }
}

// Retrieving the userID
export const getUserID = async () => {
  try {
    const userId = await AsyncStorage.getItem('userID')
    return userId
  } catch (error) {
    console.error('Error retrieving user ID:', error)
    return null
  }
}

export const resetUser = async () => {
  try {
    await AsyncStorage.removeItem('accessToken')
    await AsyncStorage.removeItem('refreshToken')
    await AsyncStorage.removeItem('userID')
  } catch (error) {
    console.error('Error clearing the tokens during logout', error)
  }
}
