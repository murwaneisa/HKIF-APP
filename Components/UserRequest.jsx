import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '../Styles/theme'

const UserRequest = () => {
  const windowWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, windowWidth)
  return (
    <View style={styles.container}>
      <Text>UserRequest</Text>
    </View>
  )
}
const getStyles = (theme, windowWidth) => {
  const tabletHeight = windowWidth >= 720 ? '5%' : '8%'
  const webWidth = windowWidth >= 900 ? '60%' : '85%'
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background2,
      alignItems: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      backgroundColor: theme.colors.accent2,
      borderRadius: 8,
      width: Platform.select({
        ios: '85%',
        android: '85%',
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
export default UserRequest
