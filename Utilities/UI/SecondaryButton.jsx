import React from 'react'
import { Pressable, Text, ActivityIndicator, View, Platform } from 'react-native'

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

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled || isLoading}
      className={buttonClasses}
      style={({ pressed }) => ({
        // Platform-specific shadows via style prop to avoid shadowOffset errors
        ...Platform.select({
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
        // Interactive states
        opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
        transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
      })}
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
    </Pressable>
  )
}

export default SecondaryButton