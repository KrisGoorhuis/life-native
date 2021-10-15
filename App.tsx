import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import Board from './components/board/board'
import Controls from './components/controls/controls'
import Header from './components/header/header'
import store from './redux'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

// Instructions from react-native-paper for making these available to Typescript
declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      newLifeGreen: string;
      adolescentLifeTeal: string;
      adultLifeBlue: string;
    }
  }
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    newLifeGreen: '#A8D1A0',
    adolescentLifeTeal: '#6D8A84',
    adultLifeBlue: '#737AAC',
  }
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <View style={styles.container}>
          <Header />
          <Board />
          <Controls />
        </View>
      </Provider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 80,
  },
});
