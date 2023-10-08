import React from 'react'
import { View, Text, Button } from 'react-native'

function Home({ navigation }) {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title='Go to Details'
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  )
}

export default Home
