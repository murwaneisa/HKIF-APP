import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useTheme } from '../../Styles/theme'

function GoogleButton({
  children,
  onPress,
  paddingVertical,
  paddingHorizontal,
}) {
  const { theme } = useTheme()
  const styles = getStyles(theme, paddingVertical, paddingHorizontal)
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: theme.colors.primary }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  )
}

const getStyles = (theme, paddingHorizontal, paddingVertical) => {
  return StyleSheet.create({
    buttonOuterContainer: {
      borderColor: theme.colors.primary,
      borderRadius: 28,
      margin: 4,
      overflow: 'hidden',
    },
    buttonInnerContainer: {
      paddingVertical: paddingVertical,
      paddingHorizontal: paddingHorizontal,
      elevation: 2,
      borderWidth: 2, // Set the thickness of the outline
      borderColor: theme.colors.primary, // Set the color of the outline
      backgroundColor: 'transparent',
    },
    buttonText: {
      fontFamily: 'Inter-SemiBold',
      color: theme.colors.accentWhite,
      textAlign: 'center',
    },
    pressed: {
      opacity: 0.75,
    },
  })
}

export default GoogleButton
