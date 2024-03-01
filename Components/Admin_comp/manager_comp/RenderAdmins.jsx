import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import React, { useEffect } from 'react'
import { useTheme } from '../../../Styles/theme'
import AdminCard from './AdminCard'
import { useSelector } from 'react-redux'
import LoadingIndicator from '../../LoadingIndicator'

const RenderAdmins = () => {
  const windowWidth = Dimensions.get('window').width
  const { theme } = useTheme()
  const styles = getStyles(theme, windowWidth)
  const admins = useSelector(state => state.admin.data)
  const isLoading = useSelector(state => state.admin.loading)
  const admin = useSelector(state => state.admin.currentAdmin)

  const renderHeader = () => (
    <View style={styles.titleContainer}>
      <Text style={styles.header}>(5) activity leaders</Text>
    </View>
  )

  if (!admins) {
    console.log('the loader function')
    return <LoadingIndicator />
  }

  return (
    <>
      {Platform.OS === 'web' ? (
        <View style={styles.container}>
          {renderHeader()}
          {admins && admins.length > 0 ? (
            admins.map((info, index) => (
              <AdminCard
                key={index}
                info={info}
                adminType={admin.role.includes('SUPERADMIN')}
              />
            ))
          ) : (
            <p>No admin data available.</p>
          )}
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader}
          data={admins}
          renderItem={({ item, index }) => (
            <AdminCard
              key={index}
              info={item}
              adminType={admin.role.includes('SUPERADMIN')}
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
