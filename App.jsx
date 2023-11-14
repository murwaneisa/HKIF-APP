import { StyleSheet, Text, View } from 'react-native'
import StackNav from './Utilities/Navigation/StackNav' // Import your navigator
import { FontLoader, ThemeProvider } from './Styles/theme'

export default function App() {
  return (
    <>
      <ThemeProvider>
        <FontLoader>
          <StackNav />
        </FontLoader>
      </ThemeProvider>
    </>
  )
}
