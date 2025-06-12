import 'react-native-gesture-handler'
import './Styles/global.css'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import StackNav from './Utilities/Navigation/StackNav'
import { FontLoader } from './Styles/theme'
import { Provider } from 'react-redux'
import store from './Utilities/Redux/store'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'



const App = () => {
  return (
    
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <NavigationContainer>
            <FontLoader>
              <StackNav />
            </FontLoader>
          </NavigationContainer>
        </Provider>
      </GestureHandlerRootView>
    
  ) 
}

export default App
