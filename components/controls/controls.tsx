import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
   generateNewArray, 
   resetBoard, 
   setBoardHeight, 
   setBoardWidth, 
   setProliferationPercentage, 
   setTileHeight, 
   setTileWidth, 
   setTurnTime, 
   togglePause 
} from '../../redux/slices/boardSlice'
import { State } from '../../redux'
import { View, StyleSheet, Text } from 'react-native'
import { Button, TextInput } from 'react-native-paper'


interface ControlsProps {

}

export default function Controls(props: ControlsProps) {
   const state = useSelector((state: State) => state)

   const paused = state.boardData.paused
   // const [_paused, _setPaused] = React.useState<boolean>(state.boardData.paused)
   const [_boardWidth, _setBoardWidth] = React.useState<number>(state.boardData.boardWidth)
   const [_boardHeight, _setBoardHeight] = React.useState<number>(state.boardData.boardHeight)
   const [_proliferation, _setProliferation] = React.useState<number>(state.boardData.proliferationPercentage)
   const [_turnTime, _setTurnTime] = React.useState<number>(state.boardData.turnTime)
   const [_tileWidth, _setTileWidth] = React.useState<number>(state.boardData.tileWidth)
   const [_tileHeight, _setTileHeight] = React.useState<number>(state.boardData.tileHeight)


   const dispatch = useDispatch()

   const restartGame = () => {
      console.log("restarting")
      dispatch(generateNewArray())
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

   const _togglePause = () => {
      dispatch(togglePause(!paused))
   }

   useEffect(() => {
      resetControls()
   })



   const styles = StyleSheet.create({
      container: {
         position: 'absolute',
         bottom: 30,
      },
      inputContainer: {
         display: 'flex',
         flexWrap: 'wrap',
         alignContent: 'center',
         width: '100%',
         flexDirection: 'row',
      },
      inputField: {
         width: 185,
      },
      buttonContainer: {
         flexDirection: 'row',
         justifyContent: 'center',
      },
      controlsButton: {

      }
   })


   return (
      <View style={styles.container}>
         <Text>Extreme values may cause weird behavior.</Text>
         <View style={styles.inputContainer}>
            <TextInput
               keyboardType={'numeric'}
               label={"Board width (tiles):"}
               style={styles.inputField}
               value={_boardWidth.toString()}
               onChangeText={(text: string) => _setBoardWidth(parseFloat(text) || 0)}
            />

            <TextInput
               keyboardType={'numeric'}
               label={"Board height (tiles):"}
               style={styles.inputField}
               value={_boardHeight.toString()}
               onChangeText={(text: string) => _setBoardHeight(parseFloat(text) || 0)}
            />

            <TextInput
               keyboardType={'numeric'}
               label={"Life %'age:"}
               style={styles.inputField}
               value={_proliferation.toString()}
               onChangeText={(text: string) => _setProliferation(parseFloat(text) || 0)}
            />

            <TextInput
               keyboardType={'numeric'}
               label={"Turn time (ms):"}
               style={styles.inputField}
               value={_turnTime.toString()}
               onChangeText={(text: string) => _setTurnTime(parseFloat(text) || 0)}
            />

            <TextInput
               keyboardType={'numeric'}
               label={"Tile width:"}
               style={styles.inputField}
               value={_tileWidth.toString()}
               onChangeText={(text: string) => _setTileWidth(parseFloat(text) || 0)}
            />

            <TextInput
               keyboardType={'numeric'}
               label={"Tile height:"}
               style={styles.inputField}
               value={_tileHeight.toString()}
               onChangeText={(text: string) => _setTileHeight(parseFloat(text) || 0)}
            />

         </View>

         <View style={styles.buttonContainer}>
            <Button
               onTouchStart={_togglePause}
               style={styles.controlsButton}
            >
               {paused ? "Resume" : "Pause"}
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
         </View>
      </View >
   )
}