import React from 'react'
import { Pressable, Text, ActivityIndicator, View, StyleSheet, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated'

function PrimaryButton({
  children,
  onPress,
  onLongPress,
  disabled = false,
  isLoading = false,
  size = 'default', // 'small', 'default', 'large'
  width = 'full',   // 'full', 'auto'
  variant = 'primary', // 'primary', 'secondary' (removed outline)
  loadingText = "Loading...",
  textClassName = "",
  style = {},
}) {
  // Reanimated shared values for proper animations
  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)
  const sizeClasses = {
    small: 'h-9 px-4 py-2',
    default: 'h-12 px-6 py-3',
    large: 'h-14 px-8 py-4',
  }
  const widthClasses = {
    full: 'w-full',
    auto: 'w-auto',
  }
  const gradientColors = {
    primary: ['#2082E4', '#06DCD5'], // brand to accent from theme
    secondary: ['#06DCD5', '#14DDAC'], // accent to accent-deep
  }
  const disabledGradientColors = {
    primary: ['#1A6BB8', '#05A3A0'], // darker versions of primary gradient
    secondary: ['#05A3A0', '#0F9D7A'], // darker versions of secondary gradient
  }
  const textSizes = {
    small: 'text-sm',
    default: 'text-base',
    large: 'text-lg',
  }
  const currentGradient = disabled 
    ? (disabledGradientColors[variant] || disabledGradientColors.primary)
    : (gradientColors[variant] || gradientColors.primary)

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
        className={`
          relative
          overflow-hidden
          rounded-xl
          ${widthClasses[width] || width}
          ${sizeClasses[size]}
        `}
        style={[
          styles.shadow,
          animatedStyle,
          style,
        ]}
        pointerEvents="box-none"
      >
      {/* Gradient background - Always rendered */}
      <LinearGradient
        colors={currentGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 12,
        }}
        pointerEvents="none"
      />
      {/* Button Content */}
      <View className="flex-row items-center justify-center w-full h-full">
        {isLoading ? (
          <View className="flex-row items-center justify-center">
            <ActivityIndicator 
              size={size === 'small' ? 'small' : 'small'} 
              color="#fff"
            />
            <Text 
              className={`${textSizes[size]} font-semibold ml-2 text-white ${textClassName}`}
              style={{ 
                lineHeight: undefined,
                textAlignVertical: 'center',
                includeFontPadding: false
              }}
            >
              {loadingText}
            </Text>
          </View>
        ) : (
          <Text 
            className={`${textSizes[size]} font-semibold text-center text-white ${textClassName}`}
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
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  shadow: Platform.select({
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
});

export default PrimaryButton
