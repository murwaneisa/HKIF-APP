import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

const HeaderLeft = (  ) => {
  const navigation = useNavigation()
  const route = useRoute();
  const styles = getStyles()

  const isRootScreen = route.name === 'Home' || route.name === 'HomeMenu';

   return (
     <View style={styles.wrapper}>
       <TouchableOpacity
         onPress={() => {
           isRootScreen ? navigation.openDrawer() : navigation.goBack();
         }}
       >
         <Ionicons
           name={isRootScreen ? 'menu' : 'arrow-back-outline'}
           style={styles.icon}
         />
       </TouchableOpacity>
     </View>
   );
}

const getStyles =()=>
  StyleSheet.create({
    wrapper: {
      marginLeft: 15,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    icon: {
      fontSize: 34,
      color: '#6B6B6B',
    },
  })

export default HeaderLeft
