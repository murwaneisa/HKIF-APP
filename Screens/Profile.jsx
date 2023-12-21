import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native'
import React from 'react'
import { useTheme } from '../Styles/theme'
import { Feather } from '@expo/vector-icons'

const Profile = ({ navigation }) => {
  const { theme } = useTheme()
  const windowWidth = Dimensions.get('window').width
  const styles = getStyles(theme, windowWidth)

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://images.unsplash.com/photo-1513635625218-6956bc843133?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vdGJhbGwlMjBpbiUyMHNwb3J0JTIwaGFsbHxlbnwwfHwwfHx8MA%3D%3D',
            }}
            resizeMode='cover'
          />
        </View>
        <Text style={styles.title}>Ahmed Mohammed</Text>
      </View>
      <View style={styles.contentSection}>
        <View style={styles.infoCard}>
          <View style={styles.iconTextWrapper}>
            <Feather name='user' style={styles.infoIcon} />
            <Text style={styles.infoText}>Ahmed Mohammed</Text>
          </View>
          <Pressable
            style={styles.editIconWrapper}
            onPress={() => {
              navigation.navigate('EditProfile', { type: 'Name' })
            }}
          >
            <Feather name='edit' style={styles.icon} />
          </Pressable>
        </View>
        <View style={styles.infoCard}>
          <View style={styles.iconTextWrapper}>
            <Feather name='mail' style={styles.infoIcon} />
            <Text style={styles.infoText}>a23134@gmail.com</Text>
          </View>
          <Pressable
            style={styles.editIconWrapper}
            onPress={() => {
              navigation.navigate('EditProfile', { type: 'Email' })
            }}
          >
            <Feather name='edit' style={styles.icon} />
          </Pressable>
        </View>
        <View style={styles.infoCard}>
          <View style={styles.iconTextWrapper}>
            <Feather name='map-pin' style={styles.infoIcon} />
            <Text style={styles.infoText} numberOfLines={1}>
              Olastorpsvägen 38, 391 29, Kristianstad asdfdsaf
            </Text>
          </View>
          <Pressable
            style={styles.editIconWrapper}
            onPress={() => {
              navigation.navigate('EditProfile', { type: 'Address' })
            }}
          >
            <Feather name='edit' style={styles.icon} />
          </Pressable>
        </View>
        <View style={styles.infoCard}>
          <View style={styles.iconTextWrapper}>
            <Feather name='phone' style={styles.infoIcon} />
            <Text style={styles.infoText}>070022442214</Text>
          </View>
          <Pressable
            style={styles.editIconWrapper}
            onPress={() => {
              navigation.navigate('EditProfile', { type: 'Phone' })
            }}
          >
            <Feather name='edit' style={styles.icon} />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const getStyles = (theme, windowWidth) => {
  const tabletHeight = windowWidth >= 720 ? '5%' : '8%'
  const tabletPadding = windowWidth >= 720 ? '10%' : '5%'
  const webWidth = windowWidth >= 900 ? '60%' : '85%'

  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.backgroundPrimary,
      flex: 1,
    },
    headerSection: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 25,
      paddingBottom: 25,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    imageContainer: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      width: 120,
      height: 120,
      borderRadius: 120,
      marginBottom: 15,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 120,
    },
    title: {
      color: theme.colors.text,
      fontSize: 20,
      fontFamily: 'Inter-Bold',
    },
    contentSection: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    infoCard: {
      backgroundColor: theme.colors.accent,
      flexDirection: 'row',
      padding: 20,
      borderRadius: 15,
      marginBottom: 20,
    },
    iconTextWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    infoIcon: {
      color: theme.colors.primary,
      fontSize: 16,
      marginRight: 8,
    },
    infoText: {
      color: theme.colors.text,
      fontFamily: 'Inter-SemiBold',
      fontSize: 15,
      marginRight: 40,
    },
    icon: {
      fontSize: 16,
      color: theme.colors.text,
    },
  })
}

export default Profile
