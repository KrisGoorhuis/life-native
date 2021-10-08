import React from 'react'
import { useSelector } from 'react-redux'
import { Tile } from '../../model/board'
import { State } from '../../redux'
import { View } from 'react-native'
import { StyleSheet } from 'react-native'


interface TileProps {
   tile: Tile
   toggleLife: () => void
}

export default function Tile(props: TileProps) {

   const getAgeColor = () => {
      if (props.tile.age === 1) {
         return '#A8D1A0'
      }
      if (props.tile.age === 2) {
         return "#6D8A84"
      }
      if (props.tile.age >= 3) {
         return "#737AAC"
      }
   }

   const styles = StyleSheet.create({
      tile: {
         borderColor: 'grayblue',
         width: useSelector((state: State) => state.boardData.tileWidth),
         height: useSelector((state: State) => state.boardData.tileHeight),
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


