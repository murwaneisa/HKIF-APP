import '../../firebase'
import * as ImagePicker from 'expo-image-picker'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

class HKIFImagePicker {
  static async pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    try {
      if (!result.canceled) {
        return result.assets[0].uri
      }
    } catch (e) {
      console.log(e)
    }

    return null
  }

  static async uploadImageToDB(uri) {
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
    console.log('firebase ', fileRef)
    return await getDownloadURL(fileRef)
  }
}

export default HKIFImagePicker
