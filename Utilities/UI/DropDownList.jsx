import React, { useState } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { useTheme } from '../../Styles/theme'

const DropdownList = ({
  label,
  placeholder,
  selectedValue,
  onValueChange,
  data,
  error,
}) => {
  const [isFocus, setIsFocus] = useState(false)
  const { theme } = useTheme()
  const styles = getStyles(theme)
  let isSearch = false
  if (data.length > 5) {
    isSearch = true
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View>
        {isSearch ? (
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField='label'
            valueField='value'
            placeholder={!isFocus ? placeholder : '...'}
            searchPlaceholder='Search...'
            value={selectedValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={onValueChange}
          />
        ) : (
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            maxHeight={300}
            labelField='label'
            valueField='value'
            placeholder={!isFocus ? placeholder : '...'}
            searchPlaceholder='Search...'
            value={selectedValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={onValueChange}
          />
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

export default DropdownList
const getStyles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.accent,
      backgroundColor: 'white',
      marginHorizontal: 4,
      marginVertical: 8,
      borderRadius: 6,
    },
    dropdown: {
      backgroundColor: theme.colors.accent,
      color: theme.colors.text,
      padding: Platform.select({
        ios: 10,
        android: 6,
        web: 16,
      }),
      borderRadius: 6,
      fontSize: 18,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      fontFamily: 'Inter-SemiBold',
      fontSize: Platform.select({
        ios: 18,
        android: 12,
        web: 18,
      }),
      color: theme.colors.text,
      marginBottom: 5,
    },
    placeholderStyle: {
      fontSize: 16,
      color: theme.colors.text,
    },
    selectedTextStyle: {
      fontSize: 16,
      color: theme.colors.text,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    errorText: {
      color: 'red',
      fontSize: 12,
    },
  })
