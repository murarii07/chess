import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './timer/timecounter.js'
import FlagReducer from './flagSlice.js'
import websocketReducer from './games/gameboard.js'
import credentialsReducer from './games/playerCredientials.js'
import userCredientialsReducer from './games/userCredientials.js'
import FlagplayReducer from "./games/flag.js"
export default configureStore({
  reducer: {
    time: counterReducer,
    flag: FlagReducer,
    ws:websocketReducer,
    opponent:credentialsReducer,
    user:userCredientialsReducer,
    f:FlagplayReducer,
  }
})