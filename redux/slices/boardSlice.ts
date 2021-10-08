import {
   createSlice,
   PayloadAction,
} from "@reduxjs/toolkit"
import { Board, Square } from "../../model/board"
import _ from 'lodash'


interface BookDataState {
   boardData: Board
   boardWidth: number
   boardHeight: number
   tileWidth: number
   tileHeight: number
   paused: boolean
   proliferationPercentage: number
   turnTime: number
   generation: number
}

const initialBoardDataState: BookDataState = {
   boardData: [],
   boardWidth: 40,
   boardHeight: 30,
   tileWidth: 1,
   tileHeight: 1,
   paused: false,
   proliferationPercentage: 15,
   turnTime: 350,
   generation: 0
}

const bookDataSlice = createSlice({
   name: "BoardSlice",
   initialState: initialBoardDataState,
   reducers: {
      setBoardData: (state, { payload }: PayloadAction<Square[][]>) => { state.boardData = payload },
      setBoardWidth: (state, { payload }: PayloadAction<number>) => { state.boardWidth = payload },
      setBoardHeight: (state, { payload }: PayloadAction<number>) => { state.boardHeight = payload },
      setTileWidth: (state, { payload }: PayloadAction<number>) => { state.tileWidth = payload },
      setTileHeight: (state, { payload }: PayloadAction<number>) => { state.tileHeight = payload },
      setPaused: (state, { payload }: PayloadAction<boolean>) => { state.paused = payload },
      setProliferationPercentage: (state, { payload }: PayloadAction<number>) => { state.proliferationPercentage = payload },
      setTurnTime: (state, { payload }: PayloadAction<number>) => { state.turnTime = payload },
      setGeneration: (state, { payload }: PayloadAction<number>) => { state.generation = payload },

      advanceTime: (state, { payload }: PayloadAction<number>) => {
         let nextBoardData = _.cloneDeep(state.boardData)
         let nextGeneration = state.generation

         function decideFate(xPos: number, yPos: number) {
            let neighbors = 0

            // Determine the number of neighbors
            for (let i = xPos - 1; i <= xPos + 1; i++) {
               for (let j = yPos - 1; j <= yPos + 1; j++) {

                  if (i === xPos && j === yPos) {
                     continue // If we're examining ourselves, go to the next loop.
                  }

                  if (i < 0 || j < 0 || i >= nextBoardData.length || j >= nextBoardData[i].length) {
                     continue // If we're examing out of bounds bounds, go to the next loop
                  }

                  // Update based on original, not our currently updating array.
                  if (state.boardData[i][j].life === true) {
                     neighbors++
                  }
               }
            }


            // These are the rules of Conway's game. Translated from Wikipedia.

            // If the examined cell is alive
            if (nextBoardData[xPos][yPos].life === true) {
               if (neighbors < 2) {
                  return false
               }
               if (neighbors === 2 || neighbors === 3) {
                  return true
               }
               if (neighbors > 3) {
                  return false
               }
            }

            // If the examined cell is dead but close to others
            if (nextBoardData[xPos][yPos].life === false) {
               if (neighbors === 3) {
                  return true
               }
            }

            // Empty area
            return false
         }


         // If we are paused, the setTimeout is still running
         // We just aren't applying any updates.
         if (state.paused === false) {
            nextGeneration++

            for (let x = 0; x < nextBoardData.length; x++) {
               for (let y = 0; y < nextBoardData[x].length; y++) {
                  nextBoardData[x][y].life = decideFate(x, y)

                  if (nextBoardData[x][y].life === true) {
                     nextBoardData[x][y].age++
                  } else {
                     nextBoardData[x][y].age = 0
                  }
               }
            }
         }

         state.boardData = nextBoardData
         state.generation = nextGeneration
      },
      generateEmptyArray: (state, { payload }: PayloadAction<number>) => {
         let emptyArray = new Array(state.boardWidth)

         for (let i = 0; i < emptyArray.length; i++) {
            emptyArray[i] = new Array(state.boardHeight)
         }

         state.boardData = emptyArray
      },
      randomizeLife: (state, { payload }: PayloadAction<number>) => {
         let lifeArray = _.cloneDeep(state.boardData)

         for (let x = 0; x < lifeArray.length; x++) {
            for (let y = 0; y < lifeArray[x].length; y++) {
               let roll = Math.random() * 100 // We're comparing with a percentage, so bump it up two decimals
               lifeArray[x][y] = roll > state.proliferationPercentage ? { life: false, age: 0 } : { life: true, age: 0 }
            }
         }

         state.boardData = lifeArray
      },

      // toggleLife: (state, { payload }: PayloadAction<number>) => { state.boardHeight = payload },
   },
})

export const {
   setBoardData,
   setBoardWidth,
   setBoardHeight,
   setTileWidth,
   setTileHeight,
   setPaused,
   setProliferationPercentage,
   setTurnTime,
   setGeneration,
} = bookDataSlice.actions

export default bookDataSlice