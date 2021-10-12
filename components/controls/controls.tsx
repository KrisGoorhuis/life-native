import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { generateEmptyArray, randomizeLife, resetBoard, setBoardHeight, setBoardWidth, setProliferationPercentage, setTileHeight, setTileWidth, setTurnTime } from '../../redux/slices/boardSlice'
import { State } from '../../redux'
import { View, StyleSheet, Text, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import { Button, TextInput } from 'react-native-paper'


interface ControlsProps {

}

export default function Controls(props: ControlsProps) {
   const state = useSelector((state: State) => state)

   const [_paused, setPaused] = React.useState<boolean>(state.boardData.paused)
   const [_boardWidth, setBoardWidth] = React.useState<number>(state.boardData.boardWidth)
   const [_boardHeight, setBoardHeight] = React.useState<number>(state.boardData.boardHeight)
   const [_proliferation, setProliferation] = React.useState<number>(state.boardData.proliferationPercentage)
   const [_turnTime, setTurnTime] = React.useState<number>(state.boardData.turnTime)
   const [_tileWidth, setTileWidth] = React.useState<number>(state.boardData.tileWidth)
   const [_tileHeight, setTileHeight] = React.useState<number>(state.boardData.tileHeight)


   const dispatch = useDispatch()

   const restartGame = () => {
      dispatch(generateEmptyArray())
      dispatch(randomizeLife())
   }

   const reset = () => {
      console.log("RESET")
      // Control fields will reset in useEffect. Otherwise we update with old values.
      // This is a separate function from restartGame() so our reducer can revert to our initialState. restartGame() doesn't do that.
      dispatch(resetBoard())
      restartGame()
   }

   const resetControls = () => {
      dispatch(resetBoard())

      // document.querySelector('#tiles_wide').value = props.width
      // document.querySelector('#tiles_high').value = props.height
      // document.querySelector('#life_proliferation').value = props.lifeProliferation
      // document.querySelector('#turn_time').value = props.turnTime
      // document.querySelector('#tile_width').value = props.tileWidth
      // document.querySelector('#tile_height').value = props.tileHeight
   }

   // let getVal = (query) => {
   //    return parseFloat(document.querySelector(query).value)
   // }

   const generate = () => {
      console.log("GENERATE")
      // Instead of writing additional code to set our timer to 0, we can reuse reset().
      // reset()
      dispatch(setTurnTime(_turnTime))

      // These can pass NaN. The reducer will check for those.
      dispatch(setBoardWidth(_tileWidth))
      dispatch(setBoardHeight(_tileHeight))
      dispatch(setProliferationPercentage(_proliferation))
      dispatch(setTurnTime(_turnTime))
      dispatch(setTileWidth(_tileWidth))
      dispatch(setTileHeight(_tileHeight))

      restartGame()
   }

   const togglePause = () => {
      dispatch(togglePause())
      // props.dispatch({ type: 'TOGGLE_PAUSE' })
   }

   useEffect(() => {
      resetControls()
   })



   const styles = StyleSheet.create({
      controlsContainer: {

      },
      inputField: {

      },
      controlsButton: {

      }
   })

   const thing = (stuff: any) => {
      console.log("stuff")
      console.log(stuff)
      console.log(parseFloat(stuff))
      console.log("poststuff")
      if (!stuff) {
         console.log("nostuff")
         setBoardWidth(999)
      }
      else {
         setBoardWidth(parseFloat(stuff))

      }
   }

   return (
      <View style={styles.controlsContainer}>
         <Text>Extreme values may cause weird behavior.</Text>
         <TextInput
            keyboardType={'numeric'}
            label={"Tiles wide:"}
            style={styles.inputField}
            value={_boardWidth.toString()}
            onChangeText={(text: string) => setBoardWidth(parseFloat(text) || 0)}
         />

         <TextInput
            keyboardType={'numeric'}
            label={"Tiles high:"}
            style={styles.inputField}
            value={_boardHeight.toString()}
            onChangeText={(text: string) => setBoardHeight(parseFloat(text) || 0)}
         />

         <TextInput
            keyboardType={'numeric'}
            label={"Life proliferation (%):"}
            style={styles.inputField}
            value={_proliferation.toString()}
            onChangeText={(text: string) => setProliferation(parseFloat(text) || 0)}
         />

         <TextInput
            keyboardType={'numeric'}
            label={"Turn time (ms):"}
            style={styles.inputField}
            value={_turnTime.toString()}
            onChangeText={(text: string) => setTurnTime(parseFloat(text) || 0)}
         />

         <TextInput
            keyboardType={'numeric'}
            label={"Tile width (relative units):"}
            style={styles.inputField}
            value={_tileWidth.toString()}
            onChangeText={(text: string) => setTileWidth(parseFloat(text) || 0)}
         />

         <TextInput
            keyboardType={'numeric'}
            label={"Tile height (relative units):"}
            style={styles.inputField}
            value={_tileHeight.toString()}
            onChangeText={(text: string) => setTileHeight(parseFloat(text) || 0)}
         />

         <Button
            onTouchStart={togglePause}
            style={styles.controlsButton}
         >
            {_paused ? "Resume" : "Pause"}
         </Button>

         <Button
            onTouchStart={generate}
            style={styles.controlsButton}
         >
            Generate
         </Button>

         <Button
            onTouchStart={() => reset()}
            style={styles.controlsButton}
         >
            Reset
         </Button>
      </View >
   )
}