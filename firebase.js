import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyCvw9j4eIBdn8BJqQzO0RpM-uGfNYLd3Yg',
  authDomain: 'hkif-8a79e.firebaseapp.com',
  databaseURL:
    'https://hkif-8a79e-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'hkif-8a79e',
  storageBucket: 'hkif-8a79e.appspot.com',
  messagingSenderId: '855322523840',
  appId: '1:855322523840:web:7ad919ccee6d02192dd525',
}

const app = initializeApp(firebaseConfig)

export { app }
