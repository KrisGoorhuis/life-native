import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { withTheme } from 'react-native-paper'


interface HeaderProps {
   theme: ReactNativePaper.Theme
}

const fontSize = 25

const Header = (props: HeaderProps) => {

   const styles = StyleSheet.create({
      headerContainer: {
         alignItems: 'center',
         marginBottom: 20,
      },
      text: {
         color: props.theme.colors.adultLifeBlue,
         fontSize: fontSize,
      },
      lifespan: {
         color: props.theme.colors.newLifeGreen,
         fontSize: fontSize,
      },
   })

   return (
      <View style={styles.headerContainer}>
         <View style={{flexDirection: 'row'}}><Text style={styles.text}>THE GAME OF </Text><Text style={styles.lifespan}>LIFE</Text></View>
         <Text>by Kris Goorhuis</Text>
      </View>
   )
}


export default withTheme(Header)