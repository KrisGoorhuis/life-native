import {
  configureStore,
  combineReducers
}                       from '@reduxjs/toolkit'
import logger           from 'redux-logger'
import boardSlice       from './slices/boardSlice'

export type State = ReturnType<typeof reducer>

const reducer = combineReducers({
  boardData : boardSlice.reducer,
})

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
