import React from 'react'
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native'
import { useTheme } from '../../Styles/theme'
import { Feather } from '@expo/vector-icons'

const UserInfoCard = ({ iconName, text, onPress }) => {
  const { theme } = useTheme()
  const styles = getStyles(theme)

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.iconTextWrapper}>
        <Feather name={iconName} style={styles.icon} />
        <Text style={styles.text} numberOfLines={1}>
          {text}
        </Text>
      </View>
      <Feather name='edit' style={styles.editIcon} />
    </Pressable>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.accent,
      flexDirection: 'row',
      padding: 20,
      borderRadius: 15,
      marginBottom: 20,
    },
    iconTextWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    icon: {
      color: theme.colors.primary,
      fontSize: 16,
      marginRight: 8,
    },
    text: {
      color: theme.colors.text,
      fontFamily: 'Inter-SemiBold',
      fontSize: 15,
      marginRight: 40,
    },
    editIconWrapper: {
      backgroundColor: 'red',
    },
    editIcon: {
      fontSize: 16,
      color: theme.colors.text,
    },
  })

export default UserInfoCard
