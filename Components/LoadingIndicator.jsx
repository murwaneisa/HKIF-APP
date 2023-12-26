import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { useTheme } from '../Styles/theme'

const LoadingIndicator = () => {
  const { theme } = useTheme()
  const styles = getStyles(theme)
  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='small' color={theme.colors.primary} />
      </View>
    </View>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primaryBackground,
      width: '100%',
      height: '100%',
      paddingTop: 25,
    },
    loadingContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  })

export default LoadingIndicator
