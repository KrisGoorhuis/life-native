import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import Board from './components/board/board'
import Controls from './components/controls/controls'
import store from './redux'

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <ScrollView style={{ minHeight: 300 }}>
          <Board />
        </ScrollView>
        <ScrollView style={{ minHeight: 300 }}>
          <Controls />
        </ScrollView>

      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
