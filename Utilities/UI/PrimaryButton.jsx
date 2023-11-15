import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useTheme } from '../../Styles/theme'

function PrimaryButton({
  children,
  onPress,
  paddingVertical,
  paddingHorizontal,
  onLongPress,
  disabled = false,
}) {
  const { theme } = useTheme()
  const styles = getStyles(theme, paddingVertical, paddingHorizontal)
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : [styles.buttonInnerContainer, disabled && styles.disabled]
        }
        onPress={onPress}
        onLongPress={onLongPress}
        android_ripple={{ color: theme.colors.primary }}
        disabled={disabled}
      >
        <Text style={[styles.buttonText, disabled && styles.disabled]}>
          {children}
        </Text>
      </Pressable>
    </View>
  )
}

const getStyles = (theme, paddingHorizontal, paddingVertical) => {
  return StyleSheet.create({
    buttonOuterContainer: {
      borderRadius: 28,
      overflow: 'hidden',
    },
    buttonInnerContainer: {
      backgroundColor: theme.colors.primary,
      paddingVertical: paddingVertical,
      paddingHorizontal: paddingHorizontal,
      width: 'auto',
      elevation: 2,
    },
    buttonText: {
      fontFamily: 'Inter-SemiBold',
      color: theme.colors.accentWhite,
      textAlign: 'center',
    },
    pressed: {
      opacity: 0.75,
    },
    disabled: {
      color: theme.colors.background,
      backgroundColor: theme.colors.accent, // Add a disabled color to your theme or use a hardcoded color
      opacity: 0.5, // Optional: reduce opacity for disabled state
    },
  })
}

export default PrimaryButton
