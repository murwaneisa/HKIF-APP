import React from 'react'
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native'
import { useTheme } from '../../Styles/theme'

const JoinEventCard = ({ title, buttonTitle, containerStyle, onPress }) => {
  const { theme } = useTheme()
  const styles = getStyles(theme)

  return (
    <View style={[styles.basic, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={onPress} style={styles.button}>
        <Text style={styles.buttonTitle}>{buttonTitle}</Text>
      </Pressable>
    </View>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    basic: {
      backgroundColor: theme.colors.backgroundPrimary,
      paddingHorizontal: 15,
      paddingVertical: 13,
      height: Platform.select({
        ios: 85,
        android: 85,
        web: 100,
      }),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 15,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    title: {
      fontFamily: 'Inter-SemiBold',
      fontSize: Platform.select({
        ios: 16,
        android: 16,
        web: 20,
      }),
      color: theme.colors.title,
    },
    button: {
      backgroundColor: theme.colors.primary,
      height: '100%',
      width: '48%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
    },
    buttonTitle: {
      color: 'white',
      fontFamily: 'Inter-Bold',
      fontSize: Platform.select({
        ios: 15,
        android: 15,
        web: 20,
      }),
    },
  })

export default JoinEventCard
