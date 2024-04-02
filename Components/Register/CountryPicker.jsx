import React, { useState, useEffect } from 'react'
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  Platform,
} from 'react-native'
import { useTheme } from '../../Styles/theme'

const CountryPicker = ({ data, selectedValue, onValueChange, error }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const { theme } = useTheme()
  const styles = getStyles(theme)

  useEffect(() => {
    setFilteredData(data)
  }, [data])

  const handleSearch = text => {
    setSearchQuery(text)
    if (text) {
      setFilteredData(
        data.filter(item =>
          item.label.toLowerCase().includes(text.toLowerCase())
        )
      )
    } else {
      setFilteredData(data)
    }
  }

  const handleSelect = item => {
    onValueChange(item.value)
    setModalVisible(false)
  }

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Country Code</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectedTextStyle}>{selectedValue}</Text>
      </TouchableOpacity>

      <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TextInput
            placeholder='Search...'
            placeholderTextColor={theme.colors.text}
            value={searchQuery}
            onChangeText={handleSearch}
            style={styles.inputSearchStyle}
          />
          <FlatList
            data={filteredData}
            style={styles.flatList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item)}>
                <Text style={styles.countryItem}>
                  {item.label} ({item.value})
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

export default CountryPicker
const getStyles = theme =>
  StyleSheet.create({
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
    modalView: {
      flex: 1,
      marginTop: 22,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
    countryItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.accent,
      color: theme.colors.text,
    },
    inputSearchStyle: {
      height: 40,
      borderWidth: 1,
      borderColor: theme.colors.accent,
      paddingLeft: 10,
      marginTop: 10,
      marginBottom: 10,
      borderRadius: 5,
      width: '90%',
      color: theme.colors.text,
    },
    flatList: {
      width: '100%',
    },
    inputContainer: {
      marginHorizontal: 4,
      marginVertical: 8,
    },
  })
