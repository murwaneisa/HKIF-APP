import React, { useState } from 'react'
import { Button, Image, Pressable, View, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useTheme } from '../Styles/theme'

const ImagePickerExample = ({ children }) => {
  const { theme } = useTheme()
  const styles = getStyles(theme)
  const [image, setImage] = useState(null)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    try {
      if (!result.canceled) {
        const uri = result.assets[0].uri
        setImage(uri)
        return uri
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onload = function () {
        resolve(xhr.response)
      }
      xhr.onerror = function (e) {
        console.log(e)
        reject(new TypeError('Network request failed'))
      }
      xhr.responseType = 'blob'
      xhr.open('GET', uri, true)
      xhr.send(null)
    })

    const storage = getStorage()
    const fileRef = ref(storage, `images/${new Date().toISOString()}`)
    await uploadBytes(fileRef, blob)

    blob.close()

    return await getDownloadURL(fileRef)
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={pickImage} style={styles.pressableWrapper}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View>{children}</View>
        )}
      </Pressable>
      <Button
        title='Upload Image to Firebase'
        onPress={() => uploadImageAsync(image)}
      />
    </View>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      width: 200,
      height: 200,
    },
    pressableWrapper: {
      height: 200,
      width: '100%',
      backgroundColor: 'red',
    },
  })

export default ImagePickerExample
