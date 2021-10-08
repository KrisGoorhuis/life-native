import React, { useEffect, useRef } from 'react'
import './board.css'
import { useDispatch, useSelector } from 'react-redux'

import Tile from './tile'
import { State } from '../../redux'
import { advanceTime, generateEmptyArray, randomizeLife, toggleLife } from '../../redux/slices/boardSlice'
import _ from 'lodash'
import { Text, StyleSheet, View } from 'react-native'



interface BoardProps {

}

export default function Board(props: BoardProps) {
   const turnTime = useSelector((state: State) => state.boardData.turnTime)
   const width = useSelector((state: State) => state.boardData.boardWidth)
   const height = useSelector((state: State) => state.boardData.boardHeight)
   const boardData = useSelector((state: State) => state.boardData.boardData)
   const generation = useSelector((state: State) => state.boardData.generation)

   const dispatch = useDispatch()

   let turnTimeRef = useRef(turnTime)
   turnTimeRef.current = turnTime


   function startGame() {
      dispatch(generateEmptyArray())
      dispatch(randomizeLife())

      _advanceTime()
   }

   function _advanceTime() {
      dispatch(advanceTime())

      setTimeout(() => {
         _advanceTime()
      }, turnTimeRef.current)
   }

   useEffect(() => {
      // Missing dependencies warning: function name. Seems harmless. I have tried:
      // List function in dependency array. Call stack exceeded
      // Moving the function definition in here. Missing dep: props. It suggests destructuring outside.
      // Destructure outside. Missing dep: all of the destructured things.
      // So here it stays and ignored goes the warning.

      // if (window.screen.availWidth < 600) {
      //    // If we're on a phone, start a slim board instead.
      //    dispatch({ type: 'SET_WIDTH', payload: 25 })
      //    dispatch(setBoardWidth(25))
      // }

      startGame()
   }, [])


   let _toggleLife = (x: number, y: number) => {
      let newBoardData = _.cloneDeep(boardData)

      newBoardData[x][y].life = !newBoardData[x][y].life
      newBoardData[x][y].age++

      console.log(`Creating life at [${x}, ${y}]`)

      dispatch(toggleLife(newBoardData))
      dispatch({ type: 'TOGGLE_LIFE', payload: newBoardData })
   }

   return (
      <View style={styles.boardContainer}>
         <View style={styles.boardMain}>
            <View style={styles.infoBox}>
               <View style={styles.ageInfoContainer}>
                  <Text>Age</Text>
                  <View style={styles.ageInfoDetails}>
                     <View>-</View>
                     <View style={styles.ageInfoAdolescent}></View>
                     <View style={styles.ageInfoJuvenile}></View>
                     <View style={styles.ageInfoAdult}></View>
                     <View>+</View>
                  </View>
               </View>
               <section id="generation_container">
                  <Text>Generation</Text>
                  <p>{generation}</p>
               </section>
            </View>
            <table>
               {
                  boardData === null ? // This will attempt to render before useEffect makes the call to generate. Give 'em a sec.
                     <tbody id="generating_message"><tr><td>Creating life...</td></tr></tbody>
                     :
                     <tbody id="table_body">
                        {boardData.map((row, x) =>
                           <tr className="table_row" key={x}>
                              {row.map((tileData, y) =>
                                 <Tile
                                    tile={{ life: tileData.life, age: tileData.age }}
                                    toggleLife={() => _toggleLife(x, y)}
                                    key={y}
                                 />
                              )}
                           </tr>
                        )}
                     </tbody>
               }
            </table>
         </View>

      </View>
   )
}

const listing = {
   width: 8,
   height: 8,
   border: 'grayblue',
   padding: 1,
   margin: 3,
   marginBottom: 0,
}

const styles = StyleSheet.create({
   boardContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
   },
   boardMain: {
      padding: 10,
      paddingTop: 15,
      // box-shadow: -4px 2px 10px 2px rgba(0, 0, 0, .5),
      borderRadius: 5,
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: 30,
      background: 'grayblue',
      marginBottom: 15,
   },
   infoBox: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
      fontSize: 16,
   },
   ageInfoContainer: {
      // color: 'white',
   },
   ageInfoDetails: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 25,
      listStyle: 'none',
      margin: 0,
      padding: 0,
   },
   ageInfoAdolescent: {
      ...listing,
      backgroundColor: 'green',
   },
   ageInfoJuvenile: {
      ...listing,
      backgroundColor: 'teal'
   },
   ageInfoAdult: {
      ...listing,
      backgroundColor: 'blue'
   }
})