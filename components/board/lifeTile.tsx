import React from 'react'
import { useSelector } from 'react-redux'
import { Tile } from '../../model/board'
import { State } from '../../redux'
import { View, StyleSheet } from 'react-native'
import { withTheme } from 'react-native-paper'


interface TileProps {
   theme: ReactNativePaper.Theme
   tile: Tile
   toggleLife: () => void
}

export const LifeTile = (props: TileProps) => {

   const getAgeColor = () => {
      if (props.tile.age === 1) {
         return props.theme.colors.newLifeGreen
      }
      if (props.tile.age === 2) {
         return props.theme.colors.adolescentLifeTeal
      }
      if (props.tile.age >= 3) {
         return props.theme.colors.adultLifeBlue
      }
   }

   const styles = StyleSheet.create({
      tile: {
         width: useSelector((state: State) => state.boardData.tileWidth) * 7,
         height: useSelector((state: State) => state.boardData.tileHeight) * 7,
         backgroundColor: getAgeColor()
      }
   })


   return (
      <View 
         onTouchStart={ () => { props.toggleLife() } } // our toggleLife onClick is passed from board so we can more simply set coordinates there.
         style={styles.tile}
      >
         {/* ... */}
      </View>
   )
}

export default withTheme(LifeTile)