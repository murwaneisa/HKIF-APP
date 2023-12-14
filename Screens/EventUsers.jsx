import React, { useMemo } from 'react'
import { View, StyleSheet, FlatList, Platform } from 'react-native'
import { useTheme } from '../Styles/theme'
import EventUserCard from '../Components/EventUserCard'

function EventUsers({ navigation }) {
  const { theme } = useTheme()
  const styles = getStyles(theme)

  const data = useMemo(
    () =>
      Array(10)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <EventUserCard />}
        keyExtractor={i => i}
      />
    </View>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
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
