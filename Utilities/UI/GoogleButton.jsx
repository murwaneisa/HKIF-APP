import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useTheme } from '../../Styles/theme'
import Svg, { Path } from 'react-native-svg'

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
        <Svg width='35' height='35' viewBox='0 0 48 48'>
          <Path
            fill='#FFC107'
            d='M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z'
          />
          <Path
            fill='#FF3D00'
            d='m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z'
          />
          <Path
            fill='#4CAF50'
            d='M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z'
          />
          <Path
            fill='#1976D2'
            d='M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z'
          />
        </Svg>
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
      overflow: 'hidden',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderWidth: 2, // Set the thickness of the outline
      // Set the color of the outline
      backgroundColor: 'transparent',
      padding: 4,
    },
    buttonInnerContainer: {
      flexDirection: 'row', // Align children horizontally
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    buttonText: {
      fontFamily: 'Inter-SemiBold',
      color: theme.colors.text,
      paddingLeft: '4%',
    },
    pressed: {
      opacity: 0.75,
    },
  })
}

export default GoogleButton
