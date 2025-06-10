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

import { useNavigation } from '@react-navigation/core'
import { AntDesign } from '@expo/vector-icons'
import LeaderCard from './learderCard'

const RenderLeaders = () => {
  const navigation = useNavigation()
  const windowWidth = Dimensions.get('window').width
 
  const styles = getStyles( windowWidth)

  const renderHeader = () => (
    <View style={styles.titleContainer}>
      <Text style={styles.header}>(5) activity leaders</Text>
      <TouchableOpacity
        style={styles.subtitleContainer}
        onPress={() => navigation.navigate('AddLeader')}
      >
        <AntDesign name='pluscircleo' size={22} color={'green'} />
        <Text style={styles.subHeader}>Add Leader</Text>
      </TouchableOpacity>
    </View>
  )

  const users = [
    {
      name: 'Elena Gilbert',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      membership: 'Full Membership',
      phone: '+1234567890',
      email: 'elin323@gmail.com',
    },
    {
      name: 'Damon-Salvatore',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      membership: 'Membership',
      phone: '+1234567891',
      email: 'Damon-Salvator@gmail.com',
    },
    {
      name: 'Caroline Forbes',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      membership: 'Full Membership',
      phone: '+1234567892',
      email: 'Damon-Salvator@gmail.com',
    },
    {
      name: 'Stefan Salvatore',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      membership: 'Membership',
      phone: '+1234567893',
      email: 'Damon-Salvator@gmail.com',
    },
    {
      name: 'Klaus Mikaelson',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      membership: 'Membership',
      phone: '+1234567895',
      email: 'Damon-Salvator@gmail.com',
    },
    {
      name: 'Rebekah Mikaelson',
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
      membership: 'Full Membership',
      phone: '+1234567896',
      email: 'Damon-Salvator@gmail.com',
    },
    {
      name: 'Rebekah Mikaelson',
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
      membership: 'Full Membership',
      phone: '+1234567896',
      email: 'Damon-Salvator@gmail.com',
    },
    {
      name: 'Rebekah Mikaelson',
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
      membership: 'Full Membership',
      phone: '+1234567896',
      email: 'Damon-Salvator@gmail.com',
    },
  ]
  return (
    <>
      {Platform.OS === 'web' ? (
        <View style={styles.container}>
          {renderHeader()}
          {users.map((activity, index) => (
            <LeaderCard key={index} user={activity} />
          ))}
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader}
          data={users}
          renderItem={({ item, index }) => (
            <LeaderCard key={index} user={item} />
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
      backgroundColor: 'green',
      paddingBottom: 15,
    },
    titleContainer: {
      flexDirection: 'row',
      paddingHorizontal: tabletPadding, // This adds padding on the sides based on device width
      backgroundColor: 'green',
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
      color: 'black',
    },
    subHeader: {
      fontFamily: 'Inter-SemiBold',
      fontSize: Platform.select({
        ios: 16,
        android: 14,
        web: 18,
      }),
      color: 'green',
      marginLeft: 5,
    },
    subtitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  })
}

export default RenderLeaders
