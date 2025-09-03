import React from 'react'
import { Pressable, Text, ActivityIndicator, View, Platform } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated'

function SecondaryButton({
  children,
  onPress,
  onLongPress,
  disabled = false,
  isLoading = false,
  size = 'default', // 'small', 'default', 'large'
  width = 'full',   // 'full', 'auto'
  loadingText = "Loading...",
  className = "",
  icon = null, // Optional icon component
}) {
  // Reanimated shared values for proper animations
  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)
  // Size variants using NativeWind v4 classes (matching PrimaryButton)
  const sizeClasses = {
    small: 'h-9 px-4 py-2',
    default: 'h-12 px-6 py-3', 
    large: 'h-14 px-8 py-4',
  }
  
  // Width variants
  const widthClasses = {
    full: 'w-full',
    auto: 'w-auto',
  }
  
  // Text size variants
  const textSizes = {
    small: 'text-sm',
    default: 'text-base',
    large: 'text-lg',
  }

  // Combine all classes using NativeWind v4 best practices
  const buttonClasses = [
    // Base styles
    'relative overflow-hidden rounded-xl border-2 border-brand-light',
    'flex-row items-center justify-center',
    // Size and width
    sizeClasses[size],
    widthClasses[width],
    // Disabled state handled in style prop for consistency
    // Custom classes (highest priority)
    className
  ].filter(Boolean).join(' ')

  const textClasses = [
    textSizes[size],
    'font-semibold text-center text-brand-main'
  ].join(' ')

  const loadingTextClasses = [
    textSizes[size], 
    'font-semibold ml-2 text-brand-main'
  ].join(' ')

  // Animated styles using proper Reanimated patterns
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    }
  })

  // Handle press animations
  const handlePressIn = () => {
    if (!disabled && !isLoading) {
      scale.value = withSpring(0.98, { damping: 15, stiffness: 300 })
      opacity.value = withTiming(0.8, { duration: 150 })
    }
  }

  const handlePressOut = () => {
    if (!disabled && !isLoading) {
      scale.value = withSpring(1, { damping: 15, stiffness: 300 })
      opacity.value = withTiming(1, { duration: 150 })
    }
  }

  const handlePress = () => {
    if (onPress && !disabled && !isLoading) {
      onPress()
    }
  }

  return (
    <Pressable
      onPress={handlePress}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || isLoading}
    >
      <Animated.View
        className={buttonClasses}
        style={[
          // Platform-specific shadows via style prop to avoid shadowOffset errors
          Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
            },
            android: {
              elevation: 3,
            },
          }),
          animatedStyle,
          {
            opacity: disabled ? 0.5 : 1,
          },
        ]}
        pointerEvents="box-none"
      >
      {/* Button Content */}
      <View className="flex-row items-center justify-center w-full h-full">
        {isLoading ? (
          <View className="flex-row items-center justify-center">
            <ActivityIndicator 
              size={size === 'small' ? 'small' : 'small'} 
              color="#2082E4"
            />
            <Text 
              className={loadingTextClasses}
              style={{ lineHeight: undefined }}
            >
              {loadingText}
            </Text>
          </View>
        ) : (
          <View className="flex-row items-center justify-center">
            {icon && (
              <View className={children ? 'mr-2' : ''}>
                {icon}
              </View>
            )}
            {children && (
              <Text 
                className={textClasses}
                style={{ 
                  lineHeight: undefined,
                  textAlignVertical: 'center',
                  includeFontPadding: false
                }}
                numberOfLines={1}
                adjustsFontSizeToFit={false}
              >
                {children}
              </Text>
            )}
          </View>
        )}
      </View>
      </Animated.View>
    </Pressable>
  )
}

export default SecondaryButton