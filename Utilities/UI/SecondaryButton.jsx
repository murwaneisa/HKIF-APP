import React from 'react'
import { Pressable, Text, ActivityIndicator, View, Platform, StyleSheet } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated'

function SecondaryButton({
  children,
  onPress,
  onLongPress,
  disabled = false,
  isLoading = false,
  size = 'default', // 'small', 'default', 'large'
  width = 'full',   // 'full', 'auto'
  variant = 'default', // 'default', 'ghost', 'outline'
  loadingText = "Loading...",
  className = "",
  icon = null, // Optional icon component
}) {
  // Reanimated shared values for proper animations
  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)
  // Size variants
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

  // Variant styles
  const variantStyles = {
    default: {
      container: 'bg-gray-50 border border-gray-200',
      text: 'text-gray-700',
      activeText: 'text-gray-800'
    },
    ghost: {
      container: 'bg-transparent border-0',
      text: 'text-brand-main',
      activeText: 'text-brand-dark'
    },
    outline: {
      container: 'bg-transparent border border-brand-light',
      text: 'text-brand-main',
      activeText: 'text-brand-dark'
    }
  }

  const currentVariant = variantStyles[variant] || variantStyles.default

  // Combine all classes
  const buttonClasses = [
    'relative overflow-hidden rounded-xl',
    'flex-row items-center justify-center',
    sizeClasses[size],
    widthClasses[width],
    currentVariant.container,
    className
  ].filter(Boolean).join(' ')

  const textClasses = [
    textSizes[size],
    'font-semibold text-center',
    disabled ? 'text-gray-400' : currentVariant.text
  ].join(' ')

  const loadingTextClasses = [
    textSizes[size], 
    'font-semibold ml-2',
    disabled ? 'text-gray-400' : currentVariant.text
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
      scale.value = withSpring(0.96, { damping: 15, stiffness: 300 })
      opacity.value = withTiming(0.7, { duration: 100 })
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
          // Subtle shadow only for default variant
          variant === 'default' ? styles.subtleShadow : {},
          animatedStyle,
          {
            opacity: disabled ? 0.6 : 1,
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
              color={disabled ? '#9CA3AF' : (variant === 'default' ? '#6B7280' : '#2082E4')}
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

const styles = StyleSheet.create({
  subtleShadow: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    android: {
      elevation: 1,
    },
  }),
})

export default SecondaryButton