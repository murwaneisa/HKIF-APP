import './Styles/global.css'
import 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import StackNav from './Utilities/Navigation/StackNav'
import { FontLoader, ThemeProvider } from './Styles/theme'
import { Provider } from 'react-redux'
import store from './Utilities/Redux/store'
import { verifyInstallation } from 'nativewind';

export default function App() {
  verifyInstallation();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ThemeProvider>
          <FontLoader>
            <StackNav />
          </FontLoader>
        </ThemeProvider>
      </NavigationContainer>
    </Provider>
  )
}
