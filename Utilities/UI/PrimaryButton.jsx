import { Text, Pressable, View } from 'react-native'

function PrimaryButton({
  children,
  onPress,
  onLongPress,
  disabled = false,
  paddingVertical = 'py-2',
  paddingHorizontal = 'px-4',
  rippleColor = 'rgba(70,108,61,0.2)',
}) {
  const buttonClasses = `
    ${paddingVertical} ${paddingHorizontal}
    ${disabled ? 'bg-surface-secondary opacity-50' : 'bg-brand-main'}
    rounded-3xl
  `.trim()

  return (
    <View className="rounded-3xl overflow-hidden">
      <Pressable
        className={buttonClasses}
        onPress={onPress}
        onLongPress={onLongPress}
        android_ripple={{ color: rippleColor }}
        disabled={disabled}
      >
        <Text className="text-white text-center font-semibold">
          {children}
        </Text>
      </Pressable>
    </View>
  )
}

export default PrimaryButton
