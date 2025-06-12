import React from 'react'
import { Platform, Text, TextInput, View } from 'react-native'

function Input({
  label,
  value,
  onChangeText,
  rightIcon,
  error,
  touched,
  ...textInputConfig
}) {
  const inputPadding = Platform.select({
    ios: 'py-2.5 px-3',
    android: 'py-1.5 px-3',
    web: 'py-4 px-3',
  })

  const labelFontSize = Platform.select({
    ios: 'text-base',
    android: 'text-sm',
    web: 'text-base',
  })

  const inputContainerClasses = `
    relative w-full border rounded-lg overflow-hidden
    ${touched && error ? 'border-feedback-error' : 'border-border'}
    ${textInputConfig.disabled ? 'opacity-50' : ''}
  `.trim()

  const inputClasses = `
    w-full bg-surface-primary text-text-title
    ${inputPadding}
    ${rightIcon ? 'pr-12' : ''}
    ${textInputConfig.multiline ? 'min-h-[100px] py-3' : ''}
  `.trim()

  return (
    <View className="w-full my-2">
      {label && (
        <Text className={`font-semibold ${labelFontSize} text-text-title mb-1`}>
          {label}
        </Text>
      )}

      <View className={inputContainerClasses}>
        <TextInput
          className={inputClasses}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#9CA3AF"
          {...textInputConfig}
        />
        {rightIcon && (
          <View className="absolute right-0 h-full justify-center px-3">
            {rightIcon}
          </View>
        )}
      </View>

      {touched && error && (
        <Text className="text-feedback-error text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  )
}

export default Input
