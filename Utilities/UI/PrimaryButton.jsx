import React from 'react'
import { Pressable, Text, ActivityIndicator, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

function PrimaryButton({
  children,
  onPress,
  onLongPress,
  disabled = false,
  isLoading = false,
  size = 'default', // 'small', 'default', 'large'
  width = 'full',   // 'full', 'auto'
  variant = 'primary', // 'primary', 'secondary', 'outline'
  gradient = true,
  loadingText = "Loading...",
  textClassName = "",
  style = {},
}) {
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
    primary: ['#2563eb', '#14b8a6'],
    secondary: ['#6fe6c3', '#f9f871'],
    outline: ['transparent', 'transparent'],
  }
  const textSizes = {
    small: 'text-sm',
    default: 'text-base',
    large: 'text-lg',
  }
  const currentGradient = gradientColors[variant] || gradientColors.primary

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled || isLoading}
      className={`
        relative
        overflow-hidden
        rounded-xl
        shadow-lg
        transition-all duration-300
        ${widthClasses[width] || width}
        ${sizeClasses[size]}
        ${variant === 'outline' ? 'border-2 border-brand-main' : ''}
      `}
      style={({ pressed }) => [
        style,
        {
          opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      {/* Gradient background */}
      {gradient && variant !== 'outline' && (
        <LinearGradient
          colors={currentGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="absolute inset-0 rounded-xl"
          pointerEvents="none"
        />
      )}
      {/* Button Content */}
      <View className="flex-row items-center justify-center w-full h-full">
        {isLoading ? (
          <View className="flex-row items-center space-x-2">
            <ActivityIndicator 
              size={size === 'small' ? 'small' : 'small'} 
              color={variant === 'outline' ? '#2365E2' : '#fff'}
            />
            <Text className={`
              ${textSizes[size]}
              font-semibold ml-2
              ${variant === 'outline' ? 'text-brand-main' : 'text-white'}
              ${textClassName}
            `}>
              {loadingText}
            </Text>
          </View>
        ) : (
          <Text className={`
            ${textSizes[size]}
            font-semibold text-center
            ${variant === 'outline' ? 'text-brand-main' : 'text-white'}
            ${textClassName}
          `}>
            {children}
          </Text>
        )}
      </View>
    </Pressable>
  )
}

export default PrimaryButton
