import React, { useMemo } from 'react'
import { View, StyleSheet, FlatList, Platform } from 'react-native'
import { useTheme } from '../Styles/theme'
import UserCard from '../Components/UserCard'
import { useRoute } from '@react-navigation/native'

function EventUsers({ navigation }) {
  const { theme } = useTheme()
  const styles = getStyles(theme)

  const route = useRoute()
  const attendees = route.params.attendees

  return (
    <View style={styles.container}>
      <FlatList
        data={attendees}
        renderItem={({ item }) => <UserCard user={item} />}
        keyExtractor={i => i.firstName.toString().concat(i.lastName.toString())}
      />
    </View>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.backgroundPrimary,
      flex: 1,
      paddingTop: 10,
      paddingHorizontal: Platform.select({
        ios: 0,
        android: 0,
        web: '20%',
      }),
    },
  })

export default EventUsers
