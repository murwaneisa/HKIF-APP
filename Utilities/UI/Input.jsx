import React from 'react'
import { Platform, Text, TextInput, View } from 'react-native'
import { StyledComponent } from 'nativewind'

function Input({ label, value, onChangeText, rightIcon, ...textInputConfig }) {
  const inputPadding = Platform.select({
    ios: 'p-2.5',
    android: 'p-1.5',
    web: 'p-4',
  })

  const labelFontSize = Platform.select({
    ios: 'text-lg',
    android: 'text-xs',
    web: 'text-lg',
  })

  return (
    <StyledComponent component={View} className="mx-1 my-2">
      {label ? (
        <StyledComponent component={Text} className={`font-['Inter-SemiBold'] ${labelFontSize} text-text-primary mb-1`}>
          {label}
        </StyledComponent>
      ) : null}

      <StyledComponent component={View} className="relative">
        <StyledComponent
          component={TextInput}
          className={`flex-1 bg-accent text-text-primary ${inputPadding} rounded-lg text-lg`}
          value={value}
          onChangeText={onChangeText}
          {...textInputConfig}
        />
        {rightIcon && (
          <StyledComponent component={View} className="absolute top-0 right-0 bottom-0 p-2.5 bg-accent rounded-tr-lg rounded-br-lg">
            {rightIcon}
          </StyledComponent>
        )}
      </StyledComponent>
    </StyledComponent>
  )
}

export default Input
