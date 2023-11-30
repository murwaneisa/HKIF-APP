import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
  Image,
} from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../../Styles/theme'

const MemberDetails = () => {
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Member Details' })
  }, [navigation])
  const windowWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, windowWidth)

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          style={styles.image}
        />
        <View>
          <Text style={styles.name}>Zach Brown</Text>
          <Text style={styles.text}>Board Member </Text>
          <Text style={styles.text}>Full Membership </Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <View style={styles.label}>
            <Text style={styles.labelName}>First name</Text>
          </View>
          <Text style={styles.infoItemText}>Zach</Text>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.label}>
            <Text style={styles.labelName}>Last name </Text>
          </View>
          <Text style={styles.infoItemText}>Brown</Text>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.label}>
            <Text style={styles.labelName}>Email</Text>
          </View>
          <Text style={styles.infoItemText}>Zach.Brown@gmail.com</Text>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.label}>
            <Text style={styles.labelName}>Phone</Text>
          </View>
          <Text style={styles.infoItemText}>+46765627016</Text>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.label}>
            <Text style={styles.labelName}>Birth date</Text>
          </View>
          <Text style={styles.infoItemText}>23 Mars 1999</Text>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.label}>
            <Text style={styles.labelName}>Gender</Text>
          </View>
          <Text style={styles.infoItemText}>Man</Text>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.label}>
            <Text style={styles.labelName}>Role</Text>
          </View>
          <Text style={styles.infoItemText}>Board member</Text>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.label}>
            <Text style={styles.labelName}>Nationality</Text>
          </View>
          <Text style={styles.infoItemText}>Swedish</Text>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.label}>
            <Text style={styles.labelName}>City</Text>
          </View>
          <Text style={styles.infoItemText}>Kristianstad</Text>
        </View>
      </View>
    </View>
  )
}

const getStyles = (theme, windowWidth) => {
  const tabletPadding = windowWidth >= 720 ? 15 : 0
  const webWidth = windowWidth >= 900 ? '60%' : '85%'
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.colors.background2,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.accent2,
      borderRadius: 8,
      padding: 10,
      marginTop: 10,
      width: Platform.select({
        ios: '90%',
        android: '90%',
        web: webWidth,
      }),
    },
    infoContainer: {
      marginTop: 10,
      backgroundColor: theme.colors.accent2,
      borderRadius: 8,
      width: Platform.select({
        ios: '90%',
        android: '90%',
        web: webWidth,
      }),
    },
    infoItem: {
      flexDirection: 'row',
      padding: 10,
      marginTop: 4,
      borderBottomWidth: 1, // Add a bottom border
      borderBottomColor: '#e0e0e0',
      marginHorizontal: 10, // Set the color of the border
    },
    infoItemText: {
      color: theme.colors.text,
      fontFamily: 'Inter-SemiBold',
      fontWeight: 'bold',
      marginLeft: 10,
      fontSize: Platform.select({
        ios: 16,
        android: 15,
        web: 16,
      }),
    },
    label: {
      width: Platform.select({
        ios: '30%',
        android: '25%',
        web: '20%',
      }),
      marginRight: 2,
      justifyContent: 'flex-start', // Align content to the start
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 60,
      marginRight: 25,
    },
    details: {
      flex: 1,
      paddingLeft: Platform.select({
        ios: 0,
        android: tabletPadding,
        web: 12,
      }),
    },
    name: {
      fontFamily: 'Inter-SemiBold',
      fontWeight: 'bold',
      color: theme.colors.text2,
      textAlign: 'center',
      fontSize: Platform.select({
        ios: 16,
        android: 14,
        web: 16,
      }),
    },
    labelName: {
      fontFamily: 'Inter-SemiBold',
      fontWeight: 'bold',
      color: theme.colors.text2,
      textAlign: 'left',
      fontSize: Platform.select({
        ios: 16,
        android: 14,
        web: 16,
      }),
    },
    text: {
      color: theme.colors.text,
      fontFamily: 'Inter-SemiBold',
      textAlign: 'center',
      fontSize: Platform.select({
        ios: 14,
        android: 12,
        web: 16,
      }),
    },
    membership: {
      fontSize: 14,
      color: '#666',
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionButton: {
      marginLeft: Platform.select({
        ios: 10,
        android: 10,
        web: 15,
      }),
    },
    pressed: {
      opacity: 0.5,
    },
  })
}

export default MemberDetails
