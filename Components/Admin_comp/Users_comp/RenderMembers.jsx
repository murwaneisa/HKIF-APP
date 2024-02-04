import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
  FlatList,
} from 'react-native'
import React from 'react'
import RequestCard from './RequetCard'
import { useTheme } from '../../../Styles/theme'
import MemberCard from './MemberCard'
import { useSelector } from 'react-redux'

const RenderMembers = () => {
  const userList = useSelector(state => state.user.usersList)
  const adminType = useSelector(state => state.admin.currentAdmin)
  const filteredUsers = userList.filter(
    user => user.membershipType !== 'AWAITING_VERIFICATION'
  )
  console.log('the current admin  : ', adminType.role.includes('SUPERADMIN'))
  const windowWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, windowWidth)
  /* image: 'https://randomuser.me/api/portraits/women/1.jpg', */

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.header}> 150 Current Members</Text>
        <Text style={styles.subHeader}>
          Click on view to show members's details
        </Text>
      </View>
      {Platform.OS == 'web' ? (
        <View style={styles.container}>
          {filteredUsers.map((user, index) => (
            <MemberCard
              key={index}
              user={user}
              adminType={adminType.role.includes('SUPERADMIN')}
            />
          ))}
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredUsers}
          renderItem={({ item, index }) => (
            <MemberCard
              key={index}
              user={item}
              adminType={adminType.role.includes('SUPERADMIN')}
            />
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
      width: '100%',
      backgroundColor: theme.colors.backgroundSecondary,
      alignItems: Platform.select({
        android: 'center',
        ios: 'center',
      }),
    },
    titleContainer: {
      /*     borderWidth: 2,
        borderColor: 'red', */
      width: Platform.select({
        ios: '90%',
        android: '90%',
        web: webWidth,
      }), // This ensures the titleContainer takes full width
      paddingHorizontal: tabletPadding, // This adds padding on the sides based on device width
      backgroundColor: theme.colors.backgroundSecondary,
      alignItems: 'flex-start', // This aligns children to the start along the cross axis
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
      fontFamily: 'Inter-Regular',
      fontSize: Platform.select({
        ios: 16,
        android: 14,
        web: 18,
      }),
      color: theme.colors.text,
      marginBottom: 8,
    },
  })
}

export default RenderMembers
