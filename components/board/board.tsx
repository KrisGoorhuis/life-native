import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LifeTile from './lifeTile'
import { State } from '../../redux'
import { advanceTime, generateNewArray, toggleLife } from '../../redux/slices/boardSlice'
import _ from 'lodash'
import { Text, StyleSheet, View } from 'react-native'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { withTheme } from 'react-native-paper'


interface BoardProps {
   theme: ReactNativePaper.Theme
}

export const Board = (props: BoardProps) => {
   const boardState = useSelector((state: State) => state.boardData)

   const boardWidth = boardState.boardWidth
   const boardHeight = boardState.boardHeight
   const turnTime = boardState.turnTime
   const boardData = boardState.boardData
   const generation = boardState.generation

   const dispatch = useDispatch()

   let turnTimeRef = useRef(turnTime)
   turnTimeRef.current = turnTime


   function startGame() {
      dispatch(generateNewArray())

      _advanceTime()
   }

   function _advanceTime() {
      dispatch(advanceTime())
      setTimeout(() => {
         _advanceTime()
      }, turnTimeRef.current)
   }

   useEffect(() => {
      startGame()
   }, [])


   let _toggleLife = (x: number, y: number) => {
      let newBoardData = _.cloneDeep(boardData)

      newBoardData[x][y].life = !newBoardData[x][y].life
      newBoardData[x][y].age++

      console.log(`Creating life at [${x}, ${y}]`)

      dispatch(toggleLife(newBoardData))
   }


   // let _touchX = useSharedValue(0)

   // const handlePan = Animated.event([{ nativeEvent: { x: _touchX } }], {
   //    useNativeDriver: true,
   //  });



   // // Sketches aimed at getting drag to draw life to work. Maybe not
   // const [initialY, setInitialX] = React.useState<number>()
   // const [initialPanY, setInitialY] = React.useState<number>()
   // const coordinateIntervals: { x: number, y: number }[] = []

   // let previousX: number
   // let previousY: number

   // const handlePan = Animated.useAnimatedGestureHandler({

   //    onStart: (event, ctx) => {
   //       setInitialX(event.x)
   //       setInitialY(event.y)
   //    },
   //    onActive: (event, ctx) => {
   //       console.log("On active")
   //       if (previousX && Math.abs(previousX + event.x)  ) {

   //       }

   //       previousX = event.x
   //       previousY = event.y
   //    }
   // })

   console.log("generation")
   console.log(generation)


   const listing = {
      width: 8,
      height: 8,
      padding: 1,
      margin: 3,
      marginBottom: 0,
   }

   const styles = StyleSheet.create({
      boardContainer: {
         display: 'flex',
         borderColor: 'black',
         borderRadius: 5,
         borderWidth: 5,
      },
      boardMain: {
         borderRadius: 5,
         display: 'flex',
         flexDirection: 'column',
      },
      infoBox: {
         display: 'flex',
         flexDirection: 'row',
         justifyContent: 'space-around',
         marginBottom: 10,
         fontSize: 16,
      },
      ageInfoContainer: {

      },
      ageInfoDetails: {
         display: 'flex',
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'center',
         height: 25,
         margin: 0,
         padding: 0,
      },
      ageInfoAdolescent: {
         ...listing,
         backgroundColor: props.theme.colors.newLifeGreen,
      },
      ageInfoJuvenile: {
         ...listing,
         backgroundColor: props.theme.colors.adolescentLifeTeal
      },
      ageInfoAdult: {
         ...listing,
         backgroundColor: props.theme.colors.adultLifeBlue
      },
      generationContainer: {
         display: 'flex',
         flexDirection: 'column',
         height: 25,
         color: 'white',
      },
      generatingMessage: {
         minWidth: 300,
         minHeight: 300,
         color: 'white',
         fontSize: 16,
      },
      boardBody: {
         display: 'flex',
         flexDirection: 'row',
         justifyContent: 'center',
      },
      boardRow: {
         display: 'flex',
         flexDirection: 'column',
      }
   })

   return (
      <View style={styles.boardContainer}>
         <View style={styles.boardMain}>
            <View style={styles.infoBox}>
               <View style={styles.ageInfoContainer}>
                  <Text>Age</Text>
                  <View style={styles.ageInfoDetails}>
                     <Text>-</Text>
                     <View style={styles.ageInfoAdolescent}></View>
                     <View style={styles.ageInfoJuvenile}></View>
                     <View style={styles.ageInfoAdult}></View>
                     <Text>+</Text>
                  </View>
               </View>
               <View style={styles.generationContainer}>
                  <Text>Generation</Text>
                  <Text>{generation}</Text>
               </View>
            </View>
            <View>
               {
                  boardData === null ? // This will attempt to render before useEffect makes the call to generate. Give 'em a sec.
                     <View style={styles.generatingMessage}><View><Text>Creating life...</Text></View></View>
                     :
                     <View style={styles.boardBody}>
                        {boardData.map((row, x) =>
                           <View style={styles.boardRow} key={x}>
                              {row.map((tileData, y) =>
                                 <LifeTile
                                    tile={{ life: tileData.life, age: tileData.age }}
                                    toggleLife={() => _toggleLife(x, y)}
                                    key={y}
                                 />
                              )}
                           </View>
                        )}
                     </View>
               }
            </View>
         </View>

      </View>
   )
}

export default withTheme(Board)