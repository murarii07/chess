import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './timer/timecounter.js'
import FlagReducer from './flagSlice.js'
import credentialsReducer from './games/playerCredientials.js'
import userCredientialsReducer from './games/userCredientials.js'
import FlagplayReducer from "./games/flag.js"
import statusBoard from "./games/statusBoard.js"
export default configureStore({
  reducer: {
    time: counterReducer,
    flag: FlagReducer,
  
    opponent: credentialsReducer,
    user: userCredientialsReducer,
    f: FlagplayReducer,
    statusBoard: statusBoard

  }
})