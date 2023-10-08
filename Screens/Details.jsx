import React from 'react'
import { View, Text, Button } from 'react-native'

function Details({ navigation }) {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button title='Go Back' onPress={() => navigation.goBack()} />
    </View>
  )
}

export default Details
