import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import { useTheme } from '../../../Styles/theme'
import AdminCard from './AdminCard'

const RenderAdmins = () => {
  const windowWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, windowWidth)

  const admins = [
    {
      name: 'Elena Gilbert',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      roles: ['Super admin'],
      phone: '+1234567890',
      email: 'elin323@gmail.com',
    },
    {
      name: 'Damon-Salvatore',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      roles: ['Activity leader'],
      phone: '+1234567891',
      email: 'Damon-Salvator@gmail.com',
    },
    {
      name: 'Caroline Forbes',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      roles: ['Event manager'],
      phone: '+1234567892',
      email: 'Damon-Salvator@gmail.com',
    },
    {
      name: 'Stefan Salvatore',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      roles: ['Super admin', 'Activity leader'],
      phone: '+1234567893',
      email: 'Damon-Salvator@gmail.com',
    },
    {
      name: 'Klaus Mikaelson',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      roles: ['Activity leader', 'Event manager', 'Super admin'],
      phone: '+1234567895',
      email: 'Damon-Salvator@gmail.com',
    },
    {
      name: 'Rebekah Mikaelson',
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
      roles: ['Super admin', 'Event manager'],
      phone: '+1234567896',
      email: 'Damon-Salvator@gmail.com',
    },
    // Add additional users if needed, with varying roles
  ]
  const renderHeader = () => (
    <View style={styles.titleContainer}>
      <Text style={styles.header}>(5) activity leaders</Text>
    </View>
  )

  return (
    <>
      {Platform.OS === 'web' ? (
        <View style={styles.container}>
          {renderHeader()}
          {admins.map((info, index) => (
            <AdminCard key={index} info={info} />
          ))}
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader}
          data={admins}
          renderItem={({ item, index }) => (
            <AdminCard key={index} info={item} />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.container}
        />
      )}
    </>
  )
}
const getStyles = (theme, windowWidth) => {
  const tabletPadding = windowWidth >= 720 ? 15 : 0
  const webWidth = windowWidth >= 900 ? '60%' : '85%'
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.backgroundSecondary,
      paddingBottom: 15,
    },
    titleContainer: {
      flexDirection: 'row',
      paddingHorizontal: tabletPadding, // This adds padding on the sides based on device width
      backgroundColor: theme.colors.backgroundSecondary,
      alignItems: 'flex-start', // This aligns children to the start along the cross axis
      justifyContent: 'space-between',
    },
    header: {
      fontFamily: 'Inter-Bold',
      fontSize: Platform.select({
        ios: 18,
        android: 16,
        web: 25,
      }),
      paddingBottom: 2,
      color: theme.colors.title,
    },
    subHeader: {
      fontFamily: 'Inter-SemiBold',
      fontSize: Platform.select({
        ios: 16,
        android: 14,
        web: 18,
      }),
      color: theme.colors.primary,
      marginLeft: 5,
    },
    subtitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  })
}

export default RenderAdmins
