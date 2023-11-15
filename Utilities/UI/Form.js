import { Keyboard } from 'react-native'

export const validateEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
export const dismissKeyboard = () => {
  Keyboard.dismiss()
}
