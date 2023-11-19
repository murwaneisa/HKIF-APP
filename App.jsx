import { NavigationContainer } from '@react-navigation/native'
import StackNav from './Utilities/Navigation/StackNav'
import { FontLoader, ThemeProvider } from './Styles/theme'
import { Provider } from 'react-redux'
import store from './Utilities/Redux/store'

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <FontLoader>
          <NavigationContainer>
            <StackNav />
          </NavigationContainer>
        </FontLoader>
      </ThemeProvider>
    </Provider>
  )
}
