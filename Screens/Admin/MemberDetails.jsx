import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const MemberDetails = () => {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Member Details' })
  }, [navigation])

  return (
    <View>
      <Text>MemberDetails</Text>
    </View>
  )
}

export default MemberDetails
