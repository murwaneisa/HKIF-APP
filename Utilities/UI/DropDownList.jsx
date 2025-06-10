import React, { useState } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'

import { Dropdown } from 'react-native-element-dropdown'

const DropdownList = ({ label, placeholder, value, handleChange, data }) => {
  const [isFocus, setIsFocus] = useState(false)
 
   const styles = getStyles()
  let isSearch = false
  if (data.length > 5) {
    isSearch = true
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
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
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              handleChange(item.value)
              setIsFocus(false)
            }}
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
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              handleChange(item.value)
              setIsFocus(false)
            }}
          />
        )}
      </View>
    </View>
  )
}

export default DropdownList
const getStyles =()=>
  StyleSheet.create({
    container: {
      marginHorizontal: 4,
      marginVertical: 8,
      borderRadius: 6,
    },
    dropdown: {
      backgroundColor: 'gray',
      color: '#6B6B6B',
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
      color: '#6B6B6B',
      marginBottom: 5,
    },
    placeholderStyle: {
      fontSize: 16,
      color: '#6B6B6B',
    },
    selectedTextStyle: {
      fontSize: 16,
      color: '#6B6B6B',
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
