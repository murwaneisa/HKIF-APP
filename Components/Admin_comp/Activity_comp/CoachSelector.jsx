import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native'
import { MultiSelect } from 'react-native-element-dropdown'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useTheme } from '../../../Styles/theme'

const data = [
  { label: 'John Doe', value: '1' },
  { label: 'Jane Smith', value: '2' },
  { label: 'Emma Brown', value: '3' },
  { label: 'Michael Johnson', value: '4' },
  { label: 'Olivia Davis', value: '5' },
  { label: 'William Martinez', value: '6' },
  { label: 'Sophia Garcia', value: '7' },
  { label: 'James Wilson', value: '8' },
]

const CoachSelector = () => {
  const { theme, isDarkMode } = useTheme()
  const styles = getStyles(theme, isDarkMode)
  const [selected, setSelected] = useState([])

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <View style={styles.coachItem}>
          <Image
            source={{ uri: 'https://source.unsplash.com/featured/?person' }} // Replace with first coach's image URL
            style={styles.coachImage}
          />
          <Text style={styles.coachName}>{item.label}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        /*   itemContainerStyle={styles.listStyle} */
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField='label'
        valueField='value'
        placeholder='Select Coach'
        value={selected}
        search
        searchPlaceholder='Search...'
        onChange={item => {
          setSelected(item)
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={theme.colors.text}
            name='Safety'
            size={24}
          />
        )}
        renderItem={renderItem}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={styles.selectedStyle}>
              <View style={styles.coachItem}>
                <Image
                  source={{
                    uri: 'https://source.unsplash.com/featured/?person',
                  }} // Replace with first coach's image URL
                  style={styles.coachImage}
                />
                <Text style={styles.coachName}>{item.label}</Text>
              </View>
              <AntDesign color={theme.colors.text} name='delete' size={17} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default CoachSelector

const getStyles = theme => {
  return StyleSheet.create({
    container: { padding: 0 },
    dropdown: {
      height: 50,
      backgroundColor: theme.colors.accent2,
      borderRadius: 6,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    placeholderStyle: {
      fontFamily: 'Inter-Bold',
      color: theme.colors.text,
    },
    selectedTextStyle: {
      fontSize: 14,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    icon: {
      marginRight: 5,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
      paddingHorizontal: 12,
      paddingVertical: 8,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    },
    textSelectedStyle: {
      marginRight: 5,
      fontSize: 16,
    },
    coachItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 4,
    },
    coachImage: {
      width: 30, // Adjust as needed
      height: 30, // Adjust as needed
      borderRadius: 15,
    },
    coachName: {
      marginHorizontal: 5,
      color: theme.colors.text,
    },
    listStyle: {
      backgroundColor: theme.colors.accent2, // Set your desired color
      // Add other styling properties as needed
    },
  })
}
