import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native'

import PrimaryButton from '../Utilities/UI/PrimaryButton'

function Welcome({ navigation }) {
 
   const styles = getStyles()
  const handleGuestLogin = () => {
    navigation.navigate('Home')
  }
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={{ width: '100%', height: '100%' }}
          source={require('../Assets/images/sports_icon.png')}
          resizeMode='contain'
        />
      </View>
      <View styles={styles.buttonsContainer}>
        <View style={styles.buttonWrapper}>
          <PrimaryButton
            paddingVertical={98}
            paddingHorizontal={12}
            onPress={() => navigation.navigate('Login')}
          >
            Login
          </PrimaryButton>
        </View>
        <PrimaryButton
          paddingVertical={88}
          paddingHorizontal={12}
          onPress={() => navigation.navigate('Register')}
        >
          Register
        </PrimaryButton>
        <TouchableOpacity onPress={handleGuestLogin}>
          <Text style={styles.textStyle}>Login as Guest</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const getStyles =()=>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageContainer: {
      height: '60%',
      width: '100%',
      padding: '5%',
    },
    buttonsContainer: {
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonWrapper: {
      marginBottom: 10,
    },
    textStyle: {
      fontFamily: 'Inter-SemiBold',
      paddingTop: '6%',
      color: 'green',
      textAlign: 'center',
      fontSize: Platform.select({
        ios: 15,
        android: 15,
      }),
    },
  })
export default Welcome
