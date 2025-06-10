import { View, Text, Pressable } from 'react-native'
import { StyledComponent } from 'nativewind'

function PrimaryButton({
  children,
  onPress,
  paddingVertical = 'py-2',
  paddingHorizontal = 'px-4',
  onLongPress,
  disabled = false,
}) {
  const buttonClasses = `
    ${paddingVertical} ${paddingHorizontal}
    ${disabled ? 'bg-accent opacity-50' : 'bg-primary'}
    rounded-3xl
  `.trim()

  return (
    <StyledComponent component={View} className="rounded-3xl overflow-hidden">
      <StyledComponent
        component={Pressable}
        className={buttonClasses}
        onPress={onPress}
        onLongPress={onLongPress}
        android_ripple={{ color: '#466C3D' }} // primary-900 color
        disabled={disabled}
      >
        <StyledComponent component={Text} className="font-['Inter-SemiBold'] text-white text-center">
          {children}
        </StyledComponent>
      </StyledComponent>
    </StyledComponent>
  )
}

export default PrimaryButton
