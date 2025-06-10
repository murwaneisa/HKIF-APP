import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'


const LoadingIndicator = () => {
  const styles = getStyles()
  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='small' color={'#466C3D'} />
      </View>
    </View>
  )
}

const getStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: '#A9CAA1',
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
