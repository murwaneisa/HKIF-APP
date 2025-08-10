import React, { useMemo, useState } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { cssInterop } from 'nativewind'

import { Dropdown } from 'react-native-element-dropdown'
cssInterop(Dropdown, {
  className: { target: 'style' },
  placeholderClassName: { target: 'placeholderStyle' },
  selectedTextClassName: { target: 'selectedTextStyle' },
  inputSearchClassName: { target: 'inputSearchStyle' },
  iconClassName: { target: 'iconStyle' },
})

// Props:
// - label: string
// - placeholder: string
// - value: any
// - handleChange: (value) => void
// - data: Array<Record<string, any>>
// - containerStyle?: object
// - dropdownStyle?: object (deprecated, use dropdownClassName)
// - containerClassName?: string
// - dropdownClassName?: string
// - labelClassName?: string
// - showSelectedOnRight?: boolean // hides built-in selected text so you can render on right
// - labelField?: string // defaults to 'label'
// - valueField?: string // defaults to 'value'
// - leftIcon?: () => React.ReactNode
// - renderRightIconFromItem?: (selectedItem: any | undefined) => React.ReactNode
// - renderItem?: (item: any) => React.ReactNode
const DropdownList = ({
  label,
  placeholder,
  value,
  handleChange,
  data,
  containerStyle,
  dropdownStyle,
  containerClassName,
  dropdownClassName,
  labelClassName,
  showSelectedOnRight = false,
  labelField = 'label',
  valueField = 'value',
  leftIcon,
  renderRightIconFromItem,
  renderItem,
}) => {
  const [isFocus, setIsFocus] = useState(false)
 
   const styles = getStyles()
  let isSearch = false
  if (data.length > 5) {
    isSearch = true
  }

  const selectedItem = useMemo(() => data.find(d => d?.[valueField] === value), [data, value, valueField])

  const computedDropdownClassName = `${dropdownClassName ?? 'border border-surface-secondary rounded-lg px-4 py-4 bg-surface-primary'} ${
    isFocus ? 'border-brand' : ''
  }`

  const selectedTextStyle = [
    styles.selectedTextStyle,
    showSelectedOnRight ? styles.hideSelectedText : null,
  ]

  return (
    <View style={containerStyle} className={containerClassName}>
      {!!label && (
        <Text
          style={styles.label}
          className={labelClassName ?? 'text-sm text-text-subtitle font-medium mb-2'}
        >
          {label}
        </Text>
      )}
      <View>
        {isSearch ? (
          <Dropdown
            className={computedDropdownClassName}
            style={dropdownStyle}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField={labelField}
            valueField={valueField}
            placeholder={!isFocus ? placeholder : '...'}
            searchPlaceholder='Search...'
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
               handleChange(item?.[valueField])
              setIsFocus(false)
            }}
            renderLeftIcon={leftIcon ? () => leftIcon(selectedItem) : undefined}
            renderRightIcon={renderRightIconFromItem ? () => renderRightIconFromItem(selectedItem) : undefined}
            renderItem={renderItem}
          />
        ) : (
          <Dropdown
            className={computedDropdownClassName}
            style={dropdownStyle}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            maxHeight={300}
            labelField={labelField}
            valueField={valueField}
            placeholder={!isFocus ? placeholder : '...'}
            searchPlaceholder='Search...'
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
               handleChange(item?.[valueField])
              setIsFocus(false)
            }}
            renderLeftIcon={leftIcon ? () => leftIcon(selectedItem) : undefined}
            renderRightIcon={renderRightIconFromItem ? () => renderRightIconFromItem(selectedItem) : undefined}
            renderItem={renderItem}
          />
        )}
      </View>
    </View>
  )
}

export default DropdownList
const getStyles =()=>
  StyleSheet.create({
    container: {},
    icon: {
      marginLeft: 5,
    },
    label: {
      fontFamily: 'Inter-SemiBold',
      fontSize: Platform.select({
        ios: 18,
        android: 12,
        web: 18,
      }),
      color: '#6B6B6B',
      marginBottom: 5,
    },
    placeholderStyle: {
      fontSize: 16,
      color: '#9CA3AF',
    },
    selectedTextStyle: {
      fontSize: 16,
      color: '#111827',
    },
    hideSelectedText: {
      display: 'none',
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  })
