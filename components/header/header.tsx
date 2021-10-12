import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Header() {
   return (
      <View style={styles.headerContainer}>
         <Text>THE GAME OF <Text style={styles.lifespan}>LIFE</Text></Text>
         <Text>by Kris Goorhuis</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   headerContainer: {

   },
   lifespan: {

   },
})
