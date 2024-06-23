import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './timer/timecounter.js'
import FlagReducer from './flagSlice.js'
import websocketReducer from './games/gameboard.js'

export default configureStore({
  reducer: {
    time: counterReducer,
    flag: FlagReducer,
    ws:websocketReducer
  }
})