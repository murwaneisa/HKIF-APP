import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MultiSelect } from 'react-native-element-dropdown'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useTheme } from '../../Styles/theme'

const DropdownRole = ({
  data,
  placeholder,
  selectedRoles,
  setInitialFormValues,
}) => {
  const { theme, isDarkMode } = useTheme()
  const styles = getStyles(theme, isDarkMode)

  return (
    <MultiSelect
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField='label'
      valueField='value'
      placeholder={placeholder}
      searchPlaceholder='Search...'
      value={selectedRoles}
      onChange={selectedItems => {
        // Update the initialFormValue state with the selected items
        setInitialFormValues(prevValues => ({
          ...prevValues,
          roles: selectedItems,
        }))
      }}
      renderSelectedItem={(item, unSelect) => (
        <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
          <View style={styles.selectedStyle}>
            <View style={styles.coachItem}>
              <Text style={styles.coachName}>{item.label}</Text>
            </View>
            <AntDesign color={theme.colors.text} name='delete' size={17} />
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

export default DropdownRole

const getStyles = (theme, isDarkMode) => {
  return StyleSheet.create({
    dropdown: {
      height: 50,
      marginVertical: 10,
      backgroundColor: theme.colors.accent2,
      padding: 10,
      borderRadius: 10,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      color: theme.colors.text,
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    selectedStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 14,
      backgroundColor: theme.colors.accent2,
      shadowColor: '#000',
      marginTop: 8,
      marginRight: 12,
      paddingHorizontal: 5,
      paddingVertical: 8,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    },
    coachItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 4,
    },
    coachName: {
      marginHorizontal: 5,
      color: theme.colors.text,
    },
  })
}
